const db = require('../models/index');
const Event = db.Event;
const EventDate = db.EventDate;
const helper = require('../helpers/response');
const e = require('express');
const Op = db.Sequelize.Op;

module.exports = {
    getEvent: async (req, res) => {
        try {
            let { id, role, search, filter, page, limit } = req.query;
            
            if (!id || !role || !filter || !page || !limit) {
                return helper.response(res, 400, 'Bad Request', 'Please fill all of query (id, role, filter, page, limit)');
            }

            page = parseInt(page)
            limit = parseInt(limit)

            // get totalData with search / not
            let totalData
            let searchWhere = {}
            let roleWhere = {}

            search ? searchWhere = { name: { [Op.like]: `%${search}%` } } : searchWhere = {}

            if (role === 'HR'){ 
                roleWhere = {
                    companyUserId: {
                        [Op.like]: id
                    },
                }
            } else if (role === 'vendor'){
                roleWhere = {
                    vendorUserId: {
                        [Op.like]: id
                    },
                }
            } else {
                return helper.response(res, 400, 'Role is not valid')
            }

            totalData = await Event.findAndCountAll({
                where: {
                    [Op.or]: [{
                        ...searchWhere,
                        ...roleWhere
                    }],
                }
            })


            const totalPage = Math.ceil(totalData / limit)
            const offset = page * limit - limit
            const prevLink =
                page > 1
                ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
                : null
            const nextLink =
                page < totalPage
                ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
                : null

            const pageInfo = {
                page,
                totalPage,
                limit,
                totalData,
                nextLink: nextLink && process.env.URL + `/product?${nextLink}`,
                prevLink: prevLink && process.env.URL + `/product?${prevLink}`
            }

            console.log(totalData);
            return helper.response(res, 200, 'Success get data', totalData);
        } catch (error) {
            console.log(error);
            return helper.response(res, 400, error);
        }
    },

    createEvent: async (req, res) => {
        try {
            const {
                name,
                locationText,
                locationLat,
                locationLang,
                companyUserId,
                vendorUserId,
                eventDate
            } = req.body;

            if (eventDate.length > 3) {
                return helper.response(res, 400, 'Please insert only 3 date');
            }

            const newEvent = await Event.create({
                name,
                locationText,
                locationLat,
                locationLang,
                status: 'Pending',
                companyUserId,
                vendorUserId
            });

            let dateArr = []

            for (let i = 0; i < eventDate.length; i++) {
                let newDate = {
                    eventId: newEvent.id,
                    date: eventDate[i],
                }
                dateArr.push(newDate)
            }

            let eventDateArr = await EventDate.bulkCreate(dateArr);

            for (let i = 0; i < eventDateArr.length; i++) {
                delete eventDateArr[i].dataValues.eventId;
                delete eventDateArr[i].dataValues.createdAt;
                delete eventDateArr[i].dataValues.updatedAt;
            }

            const response = { ...newEvent.dataValues, eventDates: eventDateArr };

            return helper.response(res, 201, 'Event has been created', response);
        } catch (error) {
            console.log(error);
            return helper.response(res, 400, error);
        }
    },

    updateEvent : async (req, res) => {
        try {
            const { id } = req.params;
            const {
                name,
                locationText,
                locationLat,
                locationLang,
                companyUserId,
                vendorUserId,
                eventDate
            } = req.body;

            if (eventDate.length > 3) {
                return helper.response(res, 400, 'Please insert only 3 date');
            }

            await Event.update({
                name,
                locationText,
                locationLat,
                locationLang,
                companyUserId,
                vendorUserId
            }, {
                where: { id }
            })

            for (let i = 0; i < eventDate.length; i++) {
               await EventDate.update({
                    date: eventDate[i].date,
                }, {
                    where: { id: eventDate[i].id }
                })
            }

            let eventUpdated = await Event.findOne({
                where: { id },
                include: [{
                    model: EventDate,
                }]
            })

            eventUpdated.dataValues = {
                ...eventUpdated.dataValues,
                eventDates: eventUpdated.EventDates
            }

            delete eventUpdated.dataValues.EventDates;

            for (let i = 0; i < eventUpdated.dataValues.eventDates.length; i++) {
                delete eventUpdated.dataValues.eventDates[i].dataValues.eventId;
                delete eventUpdated.dataValues.eventDates[i].dataValues.createdAt;
                delete eventUpdated.dataValues.eventDates[i].dataValues.updatedAt;
            }

            const response = { ...eventUpdated.dataValues };

            return helper.response(res, 201, 'Event has been updated', response);
        } catch (error) {
            console.log(error);
            return helper.response(res, 400, error);
        }
    },

    updateStatus : async(req, res) => {
        try {
            const { id } = req.params
            const { status, confirmedDateId, remarks } = req.body

            await Event.update({
                status, 
                confirmedDateId,
                remarks
            }, {
                where: { id }
            })

            let whereInclude = {}

            if (confirmedDateId && status === 'Approve') {
                console.log('masuk');
                whereInclude = {
                    include: [{
                        model: EventDate,
                        where: {
                            id: confirmedDateId
                        }
                    }]
                }
            }

            const getEvent = await Event.findOne({
                where: { id },
                ...whereInclude
            });

            getEvent.dataValues = {
                ...getEvent.dataValues,
                eventDates : getEvent.dataValues.EventDates ? getEvent.dataValues.EventDates : []
            }

            delete getEvent.dataValues.EventDates;

            const response = {
               ...getEvent.dataValues
            }

            return helper.response(res, 201, 'Event status has been updated', response);
        } catch (error) {
            console.log(error);
            return helper.response(res, 400, error);
        }
    },

    deleteEvent : async (req, res) => {
        try {
            const { id } = req.params;

            const getEvent = await Event.findOne({
                where: { id }
            });

            if (!getEvent) {
                return helper.response(res, 400, 'Event not found');
            }

            await Event.destroy({
                where: { id }
            })

            return helper.response(res, 200, 'Event has been deleted');
        } catch (error) {
            console.log(error);
            return helper.response(res, 400, error);
        }
    }
}
const db = require('../models/index');
const Event = db.Event;
const EventDate = db.EventDate;
const helper = require('../helpers/response');
const Op = db.Sequelize.Op;
const qs = require('querystring')

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
            let filterWhere = {}

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

            if (filter === 'All'){
                filterWhere = {}
            } else if (filter === 'Pending'){
                filterWhere = {
                    status: {
                        [Op.like]: 'Pending'
                    }
                }
            } else if (filter === 'Approve'){
                filterWhere = {
                    status: {
                        [Op.like]: 'Approve'
                    }
                }
            } else if (filter === 'Reject'){
                filterWhere = {
                    status: {
                        [Op.like]: 'Reject'
                    }
                }
            } else {
                return helper.response(res, 400, 'Filter is not valid')
            }

            totalData = await Event.findAndCountAll({
                where: {
                    [Op.or]: [{
                        ...searchWhere,
                        ...roleWhere,
                        ...filterWhere
                    }],
                },
                include: [{
                    model: EventDate,
                    as: 'eventDates',
                }],
                limit : limit,
                offset : (page - 1) * limit,
                distinct: true,
            })


            const totalPage = Math.ceil(totalData.count / limit)
            const prevLink =
                page > 1
                ? qs.stringify({ ...req.query, ...{ page: page - 1 } })
                : null
            const nextLink =
                page < totalPage
                ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
                : null

            const pageInfo = {
                page,
                totalPage,
                limit,
                totalData : totalData.count,
                nextLink: nextLink && process.env.URL + `/event?${nextLink}`,
                prevLink: prevLink && process.env.URL + `/event?${prevLink}`
            }

            const response = [ ...totalData.rows ]

            return helper.response(res, 200, 'Success get data', response, pageInfo);
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
                eventDates
            } = req.body;

            if (eventDates.length > 3) {
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

            for (let i = 0; i < eventDates.length; i++) {
                let newDate = {
                    eventId: newEvent.id,
                    date: eventDates[i],
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
                eventDates
            } = req.body;

            if (eventDates.length > 3) {
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

            for (let i = 0; i < eventDates.length; i++) {
               await EventDate.update({
                    date: eventDates[i].date,
                }, {
                    where: { id: eventDates[i].id }
                })
            }

            let eventUpdated = await Event.findOne({
                where: { id },
                include: [{
                    model: EventDate,
                    as: 'eventDates',
                }]
            })

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
                        as: 'eventDates',
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
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { OrderService } from "./order.service";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";


const create = catchAsync(async (req, res) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;
    const { orderedBooks } = req.body

    const result = await OrderService.create(orderedBooks, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order created successfully!",
        data: result
    })
});



const getAll = catchAsync(async (req, res) => {
    const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);

    const result = await OrderService.getAll(options);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Orders retrieved successfully!",
        meta: result.meta,
        data: result.data
    })
});



const getSingle = catchAsync(async (req, res) => {
    const result = await OrderService.getSingle(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order retrieved successfully!",
        data: result
    })
});




const deleteOne = catchAsync(async (req, res) => {
    const result = await OrderService.deleteOne(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order deleted successfully!",
        data: result
    })
});




export const OrderController = {
    create,
    getAll,
    getSingle,
    deleteOne
}
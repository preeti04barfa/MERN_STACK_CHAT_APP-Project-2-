import express from "express";
import {Server} from "socket.io";
import http from 'http';
import mongoose from 'mongoose'
import { dbConnection } from "./Config/Db.config.js";
import { User } from "./model/UserModel.js";
import { Chat } from "./model/ChatModel.js";
import { ResponseMessage } from "./utils/ResponseMessage.js";
import { StatusCodes } from "http-status-codes";
import { handleErrorResponse, sendResponse } from "./service/CommonService.js";
import { io } from "../server.js";
import { getSingleUser, UserCreate, UserGet, userLogin } from "./controller/User.js";
import auth from "./middleware/UserAuth.js";
import router from "./router/userRouter.js";
import { getChatHistory } from "./controller/Chat.js";
import ChatRouter from "./router/ChatRouter.js";
import { Room } from "./model/RoomModel.js";
import axios from 'axios'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";



export {express, Server, http, mongoose, dbConnection, User, Chat, ResponseMessage,StatusCodes, handleErrorResponse, sendResponse, io, 
    UserCreate, auth, router, UserGet, getChatHistory, ChatRouter, Room, axios, jwt, userLogin, dotenv, getSingleUser
}
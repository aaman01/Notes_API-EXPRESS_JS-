const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { getNote, createNote, deleteNote, updateNote } = require("../../Controller/notecontrol");
const noteRoutes=express.Router();
const auth=require("../../Middleware/auth")
// before moving to getNote,createNote,....., plpz check
//if valid token is present or not for that use middleware

noteRoutes.get("/",auth,getNote);

noteRoutes.post("/",auth,createNote);

noteRoutes.delete("/:id",auth,deleteNote);

noteRoutes.put("/:id",auth,updateNote);

module.exports=noteRoutes;
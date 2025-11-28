import { Router } from "express";
import { validate } from "../utils/zod-validator.js";
import { productZod } from "../types/product-zod.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { StatusCodes } from "http-status-codes";
import { db } from "../lib/firebase.js";

const product = Router();

product.post("/create", validate(productZod), async (req, res, next) => {
  try {
    const product = req.body;

    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: Date.now(),
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (err) {
    next(err);
  }
});

product.put("/update", validate(productZod), async (req, res, next) => {
  try {
    const product = req.body;

    const productRef = doc(db, "products", product.id);
    await updateDoc(productRef, { ...product, updatedAt: Date.now() });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (err) {
    next(err);
  }
});

product.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteDoc(doc(db, "products", id));

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (err) {
    next(err);
  }
});

export default product;

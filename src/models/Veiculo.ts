import mongoose from "mongoose";

const { Schema } = mongoose;

const veiculoSchema = new Schema(
    {
        modelo: {
            type: String,
        },
        ano: {
            type: Number,
        },
        portas: {
            type: Number,
        },
        marca: {
            type: String,
        },

    },
    { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Finance ||
    mongoose.model("Veiculos", veiculoSchema);

import { Schema, model, Model, connection } from 'mongoose';

type MembersType = {
    age: number,
    email: string,
    interests: [string],
    name: {
        firstName: string,
        lastName: string
    }
};

const schema = new Schema<MembersType>({
    email: {type: String, required: true},
    age: {type: Number, required: true},
    interests: [String],
    name: {
        firstName: {type: String, required: true},
        lastName: String
    }
});

const modelName: string = 'Members';

export default (connection && connection.models[modelName]) ?
connection.models[modelName] as Model<MembersType>
:
model<MembersType>(modelName, schema);

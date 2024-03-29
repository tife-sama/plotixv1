import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload/config";
import { MongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv"
import { Coaches } from "./collections/Coaches/Coaches";
import { Media } from "./collections/Coaches/Media";

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users, Coaches, Media,],
    routes: {
        admin: '/sell'
    },
    admin: {
        user: "users",
        bundler: webpackBundler(),
        meta: {
            titleSuffix: "- Plotix",
            favicon: "/favicon.ico",
            ogImage: "/thumbnail.jpg"
        }
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!
    }),
    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts"),
    }
})
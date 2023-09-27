import * as http from 'http'
import express from "express"
import bodyParser from 'body-parser'
import AppDataSource from './config/db';


export default class Server {
    private readonly _app: express.Express
    private _server!: http.Server
    private _debug: boolean

    constructor(debug = true) {
        this._app = express()
        this._app.set("port", process.env.PORT || 3000)
        this._debug = debug
    }

    private init() {
        AppDataSource.initialize().then(async () => {
            this.configureMiddleware()
        })
    }

    get app(): express.Express {
        return this._app
    }

    get server(): http.Server {
        return this._server
    }

    public configureMiddleware() {
        this._app.use(bodyParser.json())
        this._app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use((req, res, next) => {
            if (this._debug) {
                console.log(`${req.url}`)
            }
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
            next();
        })
    }

    public async start() {
        this.init()
        this._server = this._app.listen(this._app.get("port"), () => {
            console.log("🚀 Server is running on port " + this._app.get("port"))
        })
    }

    public async stop() {
        this._server.close()
    }
}
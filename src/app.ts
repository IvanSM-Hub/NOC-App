import 'dotenv/config'
import { ServerApp } from "./presentation/server";
import { envs } from './config/plugins/envs.plugins';


( async() => {
    main()
} ) ();

function main() {
    // ServerApp.start();
    console.log(envs.PORT);
}


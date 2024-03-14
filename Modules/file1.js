// import * as f from "./file2.js";  // To import all properties

import { message, user, test } from "./file2.js";

document.body.innerHTML = message;
console.log(message);
user("Vaibhav");

let a = new test();

// default call
import vaibhav from "./file2.js";

vaibhav();

// import {user} from "./file3.js";
user("vaibhav");
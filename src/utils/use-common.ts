import { Buffer } from "buffer";
import moment from "moment";
/**
 * token to user data
 * @param token 
 * @returns 
 */
export const getUserData = (token: string) => {
     try {
          var base64Payload = token.split(".")[1];
          var payloadBuffer = Buffer.from(base64Payload, "base64");
          const data = JSON.parse(payloadBuffer.toString());
          return data;
     } catch (e) {
          return undefined;
     }
};

/**
 * 查詢條件轉換成 Url 參數
 * @param {*} params
 * @param {*} num
 * @returns
 */
export function URLSearchParams(params: any, num: boolean = true) {
     /*
     return Object.keys(params).map(function (key) {
          return key + '=' + params[key]
     }).join('&');*/

     let query = "";
     for (let [key, value] of Object.entries(params)) {
          if (typeof value == "number" && value == 0 && num == true) {
               continue;
          }
          if (typeof value == "string" && value == "") {
               continue;
          }
          //
          if (Array.isArray(value) == true) {
               for (let item of value as any[]) {
                    if (query == "") {
                         query += `${key}=${item}`;
                    } else {
                         query += `&${key}=${item}`;
                    }
               }
          } else {
               if (query == "") {
                    query += `${key}=${value}`;
               } else {
                    query += `&${key}=${value}`;
               }
          }
     }
     return query;
}

/**
 * 處理Table項次
 * @param {*} val
 */
export function handleResponse(val: any) {
     let seq = val.number * val.size;
     // 處理項次
     for (let item of val.content) {
          seq++;
          item.seq = seq;
     }
}

/**
 * 進階搜尋轉成 route query 參數
 * @param {*} params
 * @param {*} pairs
 */
export function pairToParams(params: any, pairs: any) {
     for (let [key, value] of Object.entries(pairs)) {
          let name: string;
          Object.entries(value as any).forEach(([k, v]) => {
               if (k == "prop") {
                    name = v as string;
               }

               if (k == "value") {
                    params[name] = v;
               }
          });
     }
}

/**
 * 複製
 * @param {*} obj
 * @returns
 */
export function clone(obj: any) {
     var data = JSON.stringify(obj);
     return JSON.parse(data);
}

/**
 * 將指定日期加上N天
 * @param {*} amount
 * @param {*} format
 * @returns
 */
export function addDay(amount: any, format = "YYYY-MM-DD") {
     return moment().add(amount, "days").format(format);
}

/**
 * 將日期格式化 YYYY-MM-DD
 * @param {*} inp
 * @param {*} format
 * @returns
 */
export function format(inp: any, format = "YYYY-MM-DD") {
     if (inp) {
          return moment(inp).format(format);
     }
     return "";
}
import request from "@/utils/request";

export const rightData = () => {
  return request({
    url: "private/v1/rights/list",
    method: "get",
  });
};

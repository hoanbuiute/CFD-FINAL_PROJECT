// const RULES = {
//   name: [
//     {
//       required: true,
//       message: "Vui lòng điền tên",
//     },
//   ],
//   email: [
//     {
//       required: true,
//       message: "Vui lòng điền email",
//     },
//     {
//       regrex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
//       message: "Vui lòng nhập đúng định dạng email",
//     },
//   ],
//   phone: [
//     {
//       required: true,
//       message: "Vui lòng điền số điện thoại",
//     },
//     {
//       regrex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
//       message: "Vui lòng nhập đúng định dạng số điện thoại",
//     },
//   ],
//   topic: [
//     {
//       required: true,
//       message: "Vui lòng chọn khoá học",
//     },
//   ],
//   content: [
//     {
//       required: true,
//       message: "Vui lòng điền nội dung",
//     },
//   ],
// };

const REGREX = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  password:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};

const validate = (rules, values) => {
  let errObj  = {};
//   console.log("rules", rules);
//   console.log("values", values);
///// for in vào trong rules để lấy rulesKey
  for (const ruleKey in rules) {

    for (const rule of rules[ruleKey]) {

      // case Function
      if(typeof rule === 'function'){
        //// tạo mess= function rule(values[ruleKey] là giá trị hiện tại ,values là value của cả form)
        const message =rule(values[ruleKey],values)
        ////message sẽ có 2 giá trị 
        /////nếu message có giá trị thì hiện lỗi rồi break
        if(!!message){
          errObj[ruleKey] = message || "xác thực lỗi";
          break;
        }
      }


    //   console.log("rule", rule);
      //// Nếu rule.required true thì...
      ///required

      if (rule.required) {
        ///values.[ruleKey] là email : name : ..... không có giá trị thì checkvalue
        if (!!!values[ruleKey]) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập";
          // console.log(ruleKey);
          // console.log(rule.message)
          break;
        }
      }

      ///Regrex
      //  Case: Regrex
      /////NẾu rule.regex và values[rulekey] có giá trị thì
      if (rule.regrex && values[ruleKey]) {
        let pattern = "";
        if (rule.regrex in REGREX) {
          pattern = REGREX[rule.regrex];
        } else if (rule.regrex instanceof RegExp) {
          pattern = rule.regrex;
        } else {
          pattern = new RegExp(rule.regrex, "gi");
        }
        // check regrex
        if (!pattern.test(values[ruleKey])) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập đúng định dạng";
          break;
        }
      }
    }
  }

  return errObj;
};
export const requireRule = (message) => {
  return {
    required: true,
    message,
  };
};

export const regrexRule = (regrex, message) => {
  return {
    regrex,
    message,
  };
};
export default validate;

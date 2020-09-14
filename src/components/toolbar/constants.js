import IconHandler from "./IconHandler";

export const TOOLBAR_ACTION_OPTS = {  
  pc: {
    id: "pc",
    type: "button",
    child: IconHandler("PC"),
    classNames: "chart-button",
    buttonGroup: "qc",
    lnbGroup:["qc"],
    gubunGroup:["product"],
    selected: true,
    data: {
      chartAttribute: ""
    }
  },
  ic: {
    id: "ic",
    type: "button",
    child: IconHandler("IC"),
    classNames: "chart-button",
    buttonGroup: "qc",
    lnbGroup:["qc"],
    gubunGroup:["product"],
    selected: true,
    data: {
      chartAttribute: ""
    }
  },
  list: {
    id: "list",
    type: "button",
    child: IconHandler("LIST_SVG"),
    classNames: "chart-button",
    buttonGroup: "chart",
    lnbGroup:["prevalence", "coinfection", "qc"],
    gubunGroup:["product","pathogen"],
    selected: false,
    data: {
      chartAttribute: ""
    }
  },
  bar: {
    id: "bar",
    type: "button",
    child: IconHandler("BAR_SVG"),
    classNames: "chart-button",
    buttonGroup: "chart",
    lnbGroup:["prevalence", "coinfection", "qc"],
    gubunGroup:["product","pathogen"],
    selected: true,
    data: {
      chartAttribute: ""
    }
  },
  line : {
    id: "line",
    type: "button",
    child: IconHandler("LINE_SVG"),
    classNames: "chart-button",
    buttonGroup: "chart",
    lnbGroup:["prevalence", "coinfection", "qc"],
    gubunGroup:["product","pathogen"],
    selected: false,
    data: {
      chartAttribute: ""
    }
  },
  candle : {
    id: "candle",
    type: "button",
    child: IconHandler("CANDLE_SVG"),
    classNames: "chart-button",
    buttonGroup: "chart",
    lnbGroup:["prevalence", "coinfection", "qc"],
    gubunGroup:["product","pathogen"],
    selected: false,
    data: {
      chartAttribute: ""
    }
  },
  number : {
    id: "number",
    type: "button",
    child: IconHandler("NUM"),
    classNames: "chart-button",
    buttonGroup: "data",
    lnbGroup:["prevalence", "coinfection", "qc"],
    gubunGroup:["product","pathogen"],
    selected: true,
    data: {
      chartAttribute: ""
    }
  },
  percent: {
    id: "percent",
    type: "button",
    child: IconHandler("%"),
    classNames: "chart-button",
    buttonGroup: "data",
    lnbGroup:["prevalence", "coinfection", "qc"],
    gubunGroup:["product","pathogen"],
    selected: false,
    data: {
      chartAttribute: ""
    }
  },
  ct : {
    id: "ct",
    type: "button",
    child: IconHandler("Ct"),
    classNames: "chart-button",
    buttonGroup: "data",
    lnbGroup:["prevalence", "coinfection", "qc"],
    gubunGroup:["product","pathogen"],
    selected: false,
    data: {
      chartAttribute: ""
    }
  },
  all : {
    id: "all",
    type: "button",
    child: IconHandler("All"),
    classNames: "chart-button",
    buttonGroup: "type",
    lnbGroup:["prevalence"],
    gubunGroup:["product","pathogen"],
    selected: true,
    data: {
      chartAttribute: ""
    }
  },
  each : {
    id: "each",
    type: "button",
    child: IconHandler("EACH_SVG"),
    classNames: "chart-button",
    buttonGroup: "type",
    lnbGroup:["prevalence"],
    gubunGroup:["product","pathogen"],
    selected: false,
    data: {
      chartAttribute: ""
    }
  }
};

export const TOOLBAR_ACTION_GROUP_OPTS = {
  "qc": "chart-button-group",
  "chart": "chart-button-group",
  "data": "chart-button-group",
  "type": "chart-button-group",
};
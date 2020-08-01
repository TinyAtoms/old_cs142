"use strict";
class Cs142TemplateProcessor {
    constructor(template) {
        this.temp = template;
    }
    fillIn(dict) {
        let filled_template = this.temp;
        for (var key in dict) {
            let value = dict[key];
            let template_key = "{{" + key + "}}";
            filled_template = filled_template.replace(template_key, value);
        }
        var regex = new RegExp("\{\{\w*\}\}");
        filled_template = filled_template.replace(regex, "");
        return filled_template;
    }
}
//# sourceMappingURL=cs142-template-processor.js.map
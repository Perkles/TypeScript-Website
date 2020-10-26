define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parsePrimitive = exports.extractTwoSlashComplierOptions = void 0;
    const booleanConfigRegexp = /^\/\/\s?@(\w+)$/;
    // https://regex101.com/r/8B2Wwh/1
    const valuedConfigRegexp = /^\/\/\s?@(\w+):\s?(.+)$/;
    /**
     * This is a port of the twoslash bit which grabs compiler options
     * from the source code
     */
    exports.extractTwoSlashComplierOptions = (ts) => {
        const optMap = new Map();
        // @ts-ignore - optionDeclarations is not public API
        for (const opt of ts.optionDeclarations) {
            optMap.set(opt.name.toLowerCase(), opt);
        }
        return (code) => {
            const codeLines = code.split("\n");
            const options = {};
            codeLines.forEach(line => {
                let match;
                if ((match = booleanConfigRegexp.exec(line))) {
                    options[match[1]] = true;
                    setOption(match[1], "true", options, optMap);
                }
                else if ((match = valuedConfigRegexp.exec(line))) {
                    setOption(match[1], match[2], options, optMap);
                }
            });
            return options;
        };
    };
    function setOption(name, value, opts, optMap) {
        const opt = optMap.get(name.toLowerCase());
        if (!opt)
            return;
        switch (opt.type) {
            case "number":
            case "string":
            case "boolean":
                opts[opt.name] = parsePrimitive(value, opt.type);
                break;
            case "list":
                opts[opt.name] = value.split(",").map(v => parsePrimitive(v, opt.element.type));
                break;
            default:
                opts[opt.name] = opt.type.get(value.toLowerCase());
                if (opts[opt.name] === undefined) {
                    const keys = Array.from(opt.type.keys());
                    console.log(`Invalid value ${value} for ${opt.name}. Allowed values: ${keys.join(",")}`);
                }
        }
    }
    function parsePrimitive(value, type) {
        switch (type) {
            case "number":
                return +value;
            case "string":
                return value;
            case "boolean":
                return value.toLowerCase() === "true" || value.length === 0;
        }
        console.log(`Unknown primitive type ${type} with - ${value}`);
    }
    exports.parsePrimitive = parsePrimitive;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdvc2xhc2hTdXBwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2FuZGJveC9zcmMvdHdvc2xhc2hTdXBwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFBQSxNQUFNLG1CQUFtQixHQUFHLGlCQUFpQixDQUFBO0lBRTdDLGtDQUFrQztJQUNsQyxNQUFNLGtCQUFrQixHQUFHLHlCQUF5QixDQUFBO0lBS3BEOzs7T0FHRztJQUVVLFFBQUEsOEJBQThCLEdBQUcsQ0FBQyxFQUFNLEVBQUUsRUFBRTtRQUN2RCxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFBO1FBRXJDLG9EQUFvRDtRQUNwRCxLQUFLLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRTtZQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7U0FDeEM7UUFFRCxPQUFPLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNsQyxNQUFNLE9BQU8sR0FBRyxFQUFTLENBQUE7WUFFekIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxLQUFLLENBQUE7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDNUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtvQkFDeEIsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2lCQUM3QztxQkFBTSxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUNsRCxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7aUJBQy9DO1lBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDRixPQUFPLE9BQU8sQ0FBQTtRQUNoQixDQUFDLENBQUE7SUFDSCxDQUFDLENBQUE7SUFFRCxTQUFTLFNBQVMsQ0FBQyxJQUFZLEVBQUUsS0FBYSxFQUFFLElBQXFCLEVBQUUsTUFBd0I7UUFDN0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUMxQyxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU07UUFDaEIsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ2hCLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFNBQVM7Z0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDaEQsTUFBSztZQUVQLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBUSxDQUFDLElBQWMsQ0FBQyxDQUFDLENBQUE7Z0JBQzFGLE1BQUs7WUFFUDtnQkFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO2dCQUVsRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUNoQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFTLENBQUMsQ0FBQTtvQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsS0FBSyxRQUFRLEdBQUcsQ0FBQyxJQUFJLHFCQUFxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtpQkFDekY7U0FDSjtJQUNILENBQUM7SUFFRCxTQUFnQixjQUFjLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDeEQsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQTtZQUNmLEtBQUssUUFBUTtnQkFDWCxPQUFPLEtBQUssQ0FBQTtZQUNkLEtBQUssU0FBUztnQkFDWixPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUE7U0FDOUQ7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixJQUFJLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0lBVkQsd0NBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBib29sZWFuQ29uZmlnUmVnZXhwID0gL15cXC9cXC9cXHM/QChcXHcrKSQvXG5cbi8vIGh0dHBzOi8vcmVnZXgxMDEuY29tL3IvOEIyV3doLzFcbmNvbnN0IHZhbHVlZENvbmZpZ1JlZ2V4cCA9IC9eXFwvXFwvXFxzP0AoXFx3Kyk6XFxzPyguKykkL1xuXG50eXBlIFRTID0gdHlwZW9mIGltcG9ydChcInR5cGVzY3JpcHRcIilcbnR5cGUgQ29tcGlsZXJPcHRpb25zID0gaW1wb3J0KFwidHlwZXNjcmlwdFwiKS5Db21waWxlck9wdGlvbnNcblxuLyoqXG4gKiBUaGlzIGlzIGEgcG9ydCBvZiB0aGUgdHdvc2xhc2ggYml0IHdoaWNoIGdyYWJzIGNvbXBpbGVyIG9wdGlvbnNcbiAqIGZyb20gdGhlIHNvdXJjZSBjb2RlXG4gKi9cblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RUd29TbGFzaENvbXBsaWVyT3B0aW9ucyA9ICh0czogVFMpID0+IHtcbiAgY29uc3Qgb3B0TWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKVxuXG4gIC8vIEB0cy1pZ25vcmUgLSBvcHRpb25EZWNsYXJhdGlvbnMgaXMgbm90IHB1YmxpYyBBUElcbiAgZm9yIChjb25zdCBvcHQgb2YgdHMub3B0aW9uRGVjbGFyYXRpb25zKSB7XG4gICAgb3B0TWFwLnNldChvcHQubmFtZS50b0xvd2VyQ2FzZSgpLCBvcHQpXG4gIH1cblxuICByZXR1cm4gKGNvZGU6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNvZGVMaW5lcyA9IGNvZGUuc3BsaXQoXCJcXG5cIilcbiAgICBjb25zdCBvcHRpb25zID0ge30gYXMgYW55XG5cbiAgICBjb2RlTGluZXMuZm9yRWFjaChsaW5lID0+IHtcbiAgICAgIGxldCBtYXRjaFxuICAgICAgaWYgKChtYXRjaCA9IGJvb2xlYW5Db25maWdSZWdleHAuZXhlYyhsaW5lKSkpIHtcbiAgICAgICAgb3B0aW9uc1ttYXRjaFsxXV0gPSB0cnVlXG4gICAgICAgIHNldE9wdGlvbihtYXRjaFsxXSwgXCJ0cnVlXCIsIG9wdGlvbnMsIG9wdE1hcClcbiAgICAgIH0gZWxzZSBpZiAoKG1hdGNoID0gdmFsdWVkQ29uZmlnUmVnZXhwLmV4ZWMobGluZSkpKSB7XG4gICAgICAgIHNldE9wdGlvbihtYXRjaFsxXSwgbWF0Y2hbMl0sIG9wdGlvbnMsIG9wdE1hcClcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0T3B0aW9uKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgb3B0czogQ29tcGlsZXJPcHRpb25zLCBvcHRNYXA6IE1hcDxzdHJpbmcsIGFueT4pIHtcbiAgY29uc3Qgb3B0ID0gb3B0TWFwLmdldChuYW1lLnRvTG93ZXJDYXNlKCkpXG4gIGlmICghb3B0KSByZXR1cm5cbiAgc3dpdGNoIChvcHQudHlwZSkge1xuICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgIG9wdHNbb3B0Lm5hbWVdID0gcGFyc2VQcmltaXRpdmUodmFsdWUsIG9wdC50eXBlKVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgXCJsaXN0XCI6XG4gICAgICBvcHRzW29wdC5uYW1lXSA9IHZhbHVlLnNwbGl0KFwiLFwiKS5tYXAodiA9PiBwYXJzZVByaW1pdGl2ZSh2LCBvcHQuZWxlbWVudCEudHlwZSBhcyBzdHJpbmcpKVxuICAgICAgYnJlYWtcblxuICAgIGRlZmF1bHQ6XG4gICAgICBvcHRzW29wdC5uYW1lXSA9IG9wdC50eXBlLmdldCh2YWx1ZS50b0xvd2VyQ2FzZSgpKVxuXG4gICAgICBpZiAob3B0c1tvcHQubmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBrZXlzID0gQXJyYXkuZnJvbShvcHQudHlwZS5rZXlzKCkgYXMgYW55KVxuICAgICAgICBjb25zb2xlLmxvZyhgSW52YWxpZCB2YWx1ZSAke3ZhbHVlfSBmb3IgJHtvcHQubmFtZX0uIEFsbG93ZWQgdmFsdWVzOiAke2tleXMuam9pbihcIixcIil9YClcbiAgICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQcmltaXRpdmUodmFsdWU6IHN0cmluZywgdHlwZTogc3RyaW5nKTogYW55IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgcmV0dXJuICt2YWx1ZVxuICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICByZXR1cm4gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ0cnVlXCIgfHwgdmFsdWUubGVuZ3RoID09PSAwXG4gIH1cbiAgY29uc29sZS5sb2coYFVua25vd24gcHJpbWl0aXZlIHR5cGUgJHt0eXBlfSB3aXRoIC0gJHt2YWx1ZX1gKVxufVxuIl19
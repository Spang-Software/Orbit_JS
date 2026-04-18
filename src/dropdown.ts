/**
 * @class Orbit_Dropdown
 * @description Basic ADA friendly dropdowns.
 * @author Keith Spang
 * @version 1.2.0
 */

interface DropDownOptions {
  el: HTMLElement | null;
}

class Orbit_Dropdown {

    private defaults: DropDownOptions = {
        el: null,
    }
    private options: DropDownOptions;

    constructor(args: DropDownOptions) {
        this.options = { ...this.defaults, ...args };
        if (!this.options.el) {
            console.error("Orbit_Dropdown: 'el' option is required and must be an HTMLElement.");
            return;
        }
        this.dropdown = null;
    }

    private option_tab(current_tab: HTMLElement, set_focus?: boolean = true): void {
        //..
    }

}


/**
 * @class Orbit_Takeover
 * @description Orbit_Takeover is a JS plugin for easily creating accessible takeover navigations, build to enhance takeover animations. 
 * @auther Keith Spang
 * @version 1.2.0
 */
class Orbit_Takeover {
    constructor(_id, options) {
        this.id = _id;
        this.defaults = {
            duration: 0.5,
        }
        this.settings = Object.assign({}, this.defaults, options);
        this.step_duration = this.settings.duration * 1000;
        this.events = [
            new Event('orbit_takeover_init'),
            new Event('orbit_takeover_opening'),
            new Event('orbit_takeover_open'),
            new Event('orbit_takeover_closing'),
            new Event('orbit_takeover_close'),
            new Event('orbit_takeover_toggle'),
            new Event('orbit_takeover_toggle_open'),
            new Event('orbit_takeover_toggle_close')
        ];
        this.toggle_buttons = document.querySelectorAll('[data-orbit-takeover-toggle="' + this.id + '"]') || [];
        this.menu = document.querySelector('[data-orbit-takeover-menu="' + this.id + '"]') || null;
        
        this.html = document.querySelector('html') || null;
        this.body = document.querySelector('body') || null;
        this.is_animating = false; // prevent bounce
        this.is_open = false;
        this.init();
    }

    /**
     * Toggle Takeover
     * @param {int} action - 0 = toggle, 1 = open, 2 = close
     * @return {void} 
     */
    toggle_takeover(action = 0) {
        this.is_animating = true;
        if (action === 1) {
            this.is_open = false;
        } else if (action === 2) {
            this.is_open = true;
        }
        if (!this.is_open) { // open
            document.dispatchEvent(this.events[1]); // ss_takeover_before_open
            this.html.classList.add('js-no-scroll');
            this.body.classList.add('js-no-scroll');
            this.menu.classList.add('takeover__opening');
            for (let i = 0; i < this.toggle_buttons.length; i++) {
                this.toggle_buttons[i].classList.add('takeover__opening');
            }
            setTimeout(() => {
                this.menu.classList.add('takeover__open');
                this.menu.setAttribute('aria-hidden', 'false');
                for (let i = 0; i < this.toggle_buttons.length; i++) {
                    this.toggle_buttons[i].classList.add('takeover__open');
                    this.toggle_buttons[i].setAttribute('aria-expanded', 'true');
                }
                this.is_open = true;
                this.is_animating = false;
                document.dispatchEvent(this.events[2]); // ss_takeover_after_open
            }, this.step_duration);
                
        } else {
            document.dispatchEvent(this.events[3]); // ss_takeover_before_close
            this.menu.classList.remove('takeover__open');
            for (let i = 0; i < this.toggle_buttons.length; i++) {
                this.toggle_buttons[i].classList.remove('takeover__open');
            }
            setTimeout(() => {
                this.menu.classList.remove('takeover__opening');
                this.menu.setAttribute('aria-hidden', 'true');
                for (let i = 0; i < this.toggle_buttons.length; i++) {
                    this.toggle_buttons[i].classList.remove('takeover__opening');
                    this.toggle_buttons[i].setAttribute('aria-expanded', 'false');
                }
                this.html.classList.remove('js-no-scroll');
                this.body.classList.remove('js-no-scroll');
                this.is_open = false;
                this.is_animating = false;
                document.dispatchEvent(this.events[4]); // ss_takeover_after_close
            }, this.step_duration);
        }   
    }

    /**
     * Bind Events
     * @return {void}
     */
    bind_events() {
        for (let i = 0; i < this.toggle_buttons.length; i++) {
            this.toggle_buttons[i].addEventListener("click", (e) => {
                if (this.is_animating === true) return;
                this.toggle_takeover();
            });
            this.toggle_buttons[i].addEventListener("keyup", (e) => {
                e.preventDefault();
                if (e.key === "Enter" || e.key === " ") {
                    if (this.is_animating === true) return;
                    this.toggle_takeover();
                }
            });
        }
        document.addEventListener('keydown', (e) => { // close with escape
            if (e.key === "Escape" && this.is_open) {
                if (this.is_animating === true) return;
                if (!this.is_open) return;
                this.toggle_takeover(2);
            }
        });
        document.addEventListener('orbit_takeover_toggle', (e) => {
            this.toggle_takeover();
        });
        document.addEventListener('orbit_takeover_toggle_open', (e) => {
            if (this.is_open) return;
            this.toggle_takeover(1);
        });
        document.addEventListener('orbit_takeover_toggle_close', (e) => {
            if (!this.is_open) return;
            this.toggle_takeover(2);
        });
    }

    /**
     * Initialize the ss_Takeover
     * @description Init plus validate some stuff.
     * @return {void}
     */
    init() {
        // Validate
        if (this.html === null) {
            console.error('Orbit_Takeover: html not found.');
            return;
        }
        if (this.body === null) {
            console.error('Orbit_Takeover: body not found.');
            return;
        }
        if (this.toggle_buttons < 0 || this.toggle_buttons === null) {
            console.error('Orbit_Takeover: [data-orbit-takeover-toggle] not found.');
            return;
        }
        if (this.menu === null) {
            console.error('Orbit_Takeover: [data-orbit-takeover-menu] not found.');
            return;
        }

        // ADA stuff
        for (let i = 0; i < this.toggle_buttons.length; i++) {
            this.toggle_buttons[i].setAttribute('role', 'button');
            this.toggle_buttons[i].setAttribute('aria-haspopup', 'true');
            this.toggle_buttons[i].setAttribute('aria-expanded', 'false');
            this.toggle_buttons[i].setAttribute('aria-controls', this.id);
            this.toggle_buttons[i].setAttribute('tabindex', '0');
        }
        this.menu.setAttribute('role', 'navigation');
        this.menu.setAttribute('aria-hidden', 'true');
        this.menu.setAttribute('aria-label', 'Takeover Navigation');

        // init
        document.dispatchEvent(this.events[0]);
        this.bind_events();
    }
}

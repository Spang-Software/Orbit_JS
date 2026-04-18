# Orbit JS

A JavaScript/TypeScript UI library. Featuring helpful plugins to assist in creating commen interative UI elements.


### Table of Contents

* [Takeover]  
  * [Features]  
  * [Installation]  
  * [Options]  
  * [Custom Events]  
  * [Styling with CSS]  
  * [Accessibility (ADA)]  
* [Accordion]  
  * [Features]  
  * [Installation]  
  * [Options]  
  * [Styling with CSS]  
* [Tabs]  
  * [Features]  
  * [Installation]  
  * [Keyboard Interaction]  
  * [Options]  
  * [Styling with CSS]  

-----


## Takeover

Takeover provides a simple way to implement full-screen overlay menus or "takeover" elements. It focuses on enhancing animation capabilities and ensuring accessibility standards are met.


### Features

* **Accessible**: Automatically adds ARIA attributes for improved accessibility.  
* **Animation Ready**: Provides classes for defining opening and closing animations via CSS.  
* **Custom Events**: Dispatches custom events for finer control over takeover states.  
* **Keyboard Navigation**: Supports closing with the Escape key and opening/closing with Enter/Space on toggle buttons.  
* **Scroll Locking**: Prevents body scrolling when the takeover is open.


### Installation

```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    ...
    <link rel="stylesheet" href="style.css"> <!-- Your CSS for takeover animations -->  
</head>  
<body>

    <!-- Your HTML content -->
    <button data-orbit-takeover-toggle="myTakeoverMenu">Open Menu</button>

    <div data-orbit-takeover-menu="myTakeoverMenu">  
        <!-- Menu content goes here -->  
        <nav>  
            <ul>  
                <li><a href="#">Home</a></li>  
                <li><a href="#">About</a></li>  
                <li><a href="#">Services</a></li>  
                <li><a href="#">Contact</a></li>  
            </ul>  
        </nav>   
    </div>

    <script src="orbit_js/takeover/takeover.min.js"></script> <!-- Path to your Orbit_Takeover class -->  
    <script>  
        // Initialize Orbit_Takeover  
        window.onload = function() {  
            new Orbit_Takeover('myTakeoverMenu', {  
                duration: 0.7 // Optional: adjust animation duration  
            });  
        };  
    </script>  
</body>  
</html>
```


### Options

| Option | Type | Default | Description |
| :---- | :---- | :---- | :---- |
| duration | Number | 0.5 | The duration of the CSS animation in seconds. Used for setTimeout to synchronize JS logic with CSS transitions. |


### Custom Events

| Event Name | Description | Triggered When |
| :---- | :---- | :---- |
| orbit\_takeover\_init | Takeover has been initialized. | After Orbit\_Takeover instance is created and set up. |
| orbit\_takeover\_opening | Takeover is about to begin opening animation. | Just before opening classes are added. |
| orbit\_takeover\_open | Takeover has completed its opening animation. | After the duration timeout when opening. |
| orbit\_takeover\_closing | Takeover is about to begin closing animation. | Just before closing classes are removed. |
| orbit\_takeover\_close | Takeover has completed its closing animation. | After the duration timeout when closing. |
| orbit\_takeover\_toggle | Triggers the takeover to toggle its state. | Can be dispatched manually to toggle. |
| orbit\_takeover\_toggle\_open | Triggers the takeover to open if currently closed. | Can be dispatched manually to force open. |
| orbit\_takeover\_toggle\_close | Triggers the takeover to close if currently open. | Can be dispatched manually to force close. |


### Styling with CSS

Styles are not included. Here is a basic CSS setup to get you started.

```css
/* Basic styling for your takeover menu */  
[data-orbit-takeover-menu] {  
    position: fixed;  
    top: 0;  
    left: 0;  
    width: 100%;  
    height: 100%;  
    background-color: rgba(0, 0, 0, 0.9);  
    color: white;  
    display: flex;  
    justify-content: center;  
    align-items: center;  
    visibility: hidden; /* Start hidden */  
    opacity: 0; /* Start invisible for transition */  
    transform: translateY(-100%); /* Start off-screen for slide animation */  
    transition: all 0.5s ease-out; /* Default transition, matches JS duration */  
    z-index: 9999;  
}

/* State when takeover is opening (optional, often combined with takeover__open) */  
[data-orbit-takeover-menu].takeover__opening {  
    visibility: visible;  
}

/* State when takeover is fully open */  
[data-orbit-takeover-menu].takeover__open {  
    opacity: 1;  
    transform: translateY(0);  
    visibility: visible;  
}

/* For toggle buttons, if you want them to visually change */  
[data-orbit-takeover-toggle] {  
    transition: transform 0.5s ease-out;  
}

[data-orbit-takeover-toggle].takeover__open {  
    /* Example: rotate an icon for a "close" state */  
    transform: rotate(45deg);  
}

/* Prevents scroll on html and body */  
.js-no-scroll {  
    overflow: hidden !important;  
}
```

### Accessibility (ADA)

Orbit\_Takeover automatically enhances accessibility by adding the following ARIA attributes to the relevant elements:

* **Toggle Buttons (\[data-orbit-takeover-toggle\]):**  
  * role="button"  
  * aria-haspopup="true"  
  * aria-expanded="false" (toggles to true when open)  
  * aria-controls="{menuId}" (links to the controlled menu by its ID)  
  * tabindex="0" (makes them focusable)  
* **Takeover Menu (\[data-orbit-takeover-menu\]):**  
  * role="navigation"  
  * aria-hidden="true" (toggles to false when open)  
  * aria-label="Takeover Navigation"

-----


## Accordion

A lightweight JavaScript plugin for creating accessible accordions.


### Features

  * **Simple Setup**: Easily initialize an accordion with minimal configuration.
  * **Accessibility Focused**: Adheres to WAI-ARIA practices with `aria-expanded`, `aria-controls`, and `aria-hidden` attributes for improved accessibility.


### Installation

```html
<!DOCTYPE html>
<html>
<head>
    ...
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="accordion" data-orbit-accordion>
        <button type="button" aria-expanded="true" aria-controls="sect1" id="accordion1id" data-orbit-accordion-trigger>
            <span class="accordion_title">Accordion 1</span>
            <svg class="accordion_icon" viewBox="0 0 12 10" stroke="#000" width="15px" height="15px"><path fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" d="M3,3 L7,7 L11,3"/></svg>
        </button>
        <div id="sect1" role="region" aria-labelledby="accordion1id" aria-hidden="false" data-orbit-accordion-panel>
            <div>test content for section 1</div>
        </div>
        <button type="button" aria-expanded="false" aria-controls="sect2" id="accordion2id" data-orbit-accordion-trigger>
            <span class="accordion_title">Accordion 2</span>
            <svg class="accordion_icon" viewBox="0 0 12 10" stroke="#000" width="15px" height="15px"><path fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" d="M3,3 L7,7 L11,3"/></svg>
        </button>
        <div id="sect2" role="region" aria-labelledby="accordion2id" aria-hidden="true" data-orbit-accordion-panel>
            <div>test content for section 2</div>
        </div>
        <button type="button" aria-expanded="false" aria-controls="sect3" id="accordion3id" data-orbit-accordion-trigger>
            <span class="accordion_title">Accordion 3</span>
            <svg class="accordion_icon" viewBox="0 0 12 10" stroke="#000" width="15px" height="15px"><path fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" d="M3,3 L7,7 L11,3"/></svg>
        </button>
        <div id="sect3" role="region" aria-labelledby="accordion3id" aria-hidden="true" data-orbit-accordion-panel>
            <div>test content for section 3</div>
        </div>
    </div>

    <script src="orbit_js/accordion/accordion.min.js"></script>
    <script>
        // init
        const accordionsElement = document.querySelector('[data-orbit-accordion]');
        if (accordionsElement) {
            new Orbit_Accordion({
                el: accordionsElement,
                open_multiple: false,
            });
        }
        // multiple per page  
        window.onload = function() {  
            const accordions = document.querySelectorAll('[data-orbit-accordion]');
            let i = 0;

            while (i < accordions.length) {
                new Orbit_Accordion({
                    el: accs[i],
                    open_multiple: true
                });
                i++;
            }
        };  
    </script>
</body>
</html>
```


### Options

| Option        | Type           | Default | Description                                                                                             |
| :------------ | :------------- | :------ | :------------------------------------------------------------------------------------------------------ |
| `el`          | `HTMLElement`  | `null`  | **Required**. The root DOM element containing all accordion buttons and content.                        |
| `open_multiple` | `boolean`      | `false` | If `true`, allows multiple accordion items to be open simultaneously. If `false`, only one item can be open at a time (toggles others closed). |


### Styling with CSS

Styles are not included. Here is a basic CSS setup to get you started.

```css
[data-orbit-accordion-trigger] {
    background: transparent;
    border: none;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
[data-orbit-accordion-trigger] .accordion_icon path {
    transition: d 0.3s ease;
}
[data-orbit-accordion-trigger][aria-expanded="true"] .accordion_icon path {
    d: path("M3,7 L7,3 L11,7");
}
[data-orbit-accordion-panel] {
    display: grid; 
    grid-template-rows: 0fr;
    transition: 0.3s grid-template-rows;
}
[data-orbit-accordion-panel][aria-hidden="false"] {
    grid-template-rows: 1fr;
}
[data-orbit-accordion-panel] > :first-child {
    padding-inline: 1rem;
    overflow: hidden;
}
```
-----


## Tabs

`Orbit_Tabs` is a lightweight, accessible TypeScript plugin that provides basic tab functionality adhering to ADA (Americans with Disabilities Act) standards. It ensures a seamless and inclusive user experience for all.


### Features

  * **ADA Compliant:** Built with accessibility in mind, supporting keyboard navigation and proper ARIA attributes.
  * **Lightweight:** A simple, no-frills solution for common tab panel requirements.
  * **Easy to Use:** Quickly integrate interactive tabs into your web projects with minimal setup.


### Installation

```html
<!DOCTYPE html>
<html>
<head>
    ...
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="tabs" data-orbit-tabs>
    <div role="tablist" aria-labelledby="tablist-1" class="automatic">
        <button id="tab-1" type="button" role="tab" aria-selected="true" aria-controls="tabpanel-1">
          <span class="focus">Maria Ahlefeldt</span>
        </button>
        <button id="tab-2" type="button" role="tab" aria-selected="false" aria-controls="tabpanel-2" tabindex="-1">
          <span class="focus">Carl Andersen</span>
        </button>
        <button id="tab-3" type="button" role="tab" aria-selected="false" aria-controls="tabpanel-3" tabindex="-1">
          <span class="focus">Ida da Fonseca</span>
        </button>
        <button id="tab-4" type="button" role="tab" aria-selected="false" aria-controls="tabpanel-4" tabindex="-1">
          <span class="focus">Peter Müller</span>
        </button>
    </div>

    <div id="tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
        <p>
            <!-- Your HTML content -->
        </p>
    </div>
    <div id="tabpanel-2" role="tabpanel" tabindex="0" aria-labelledby="tab-2">
        <p>
            <!-- Your HTML content -->
        </p>
    </div>
    <div id="tabpanel-3" role="tabpanel" tabindex="0" aria-labelledby="tab-3">
        <p>
            <!-- Your HTML content -->
        </p>
    </div>
    <div id="tabpanel-4" role="tabpanel" tabindex="0" aria-labelledby="tab-4">
        <p>
            <!-- Your HTML content -->
        </p>
    </div>
</div>


<script src="orbit_js/tabs/tabs.min.js"></script>
<script>
    window.addEventListener('load', function () {
        const tabs = document.querySelector('[data-orbit-tabs]');
        if (tabs) {
            new Orbit_Tabs({
                el: tabs,
                virtical: true
            });
        }
    });
</script>
</body>
</html>
```


### Keyboard Interaction

The `Orbit_Tabs` plugin supports the following keyboard interactions for enhanced accessibility:

  * **Left Arrow (←):** Moves focus to the previous tab. If on the first tab, moves to the last tab.
  * **Right Arrow (→):** Moves focus to the next tab. If on the last tab, moves to the first tab.
  * **Home:** Moves focus to the first tab.
  * **End:** Moves focus to the last tab.


### Options

| Option        | Type           | Default | Description                                                                                             |
| :------------ | :------------- | :------ | :------------------------------------------------------------------------------------------------------ |
| `el`          | `HTMLElement`  | `null`  | **Required**. The root DOM element containing all tab buttons and content.                        |
| `virtical` | `boolean`      | `false` | If `true`, The keyboard arrow controls are switched to up and down. If `false`, The keyboard arrow controls are as defined in Keyboard Interaction. |


### Styling with CSS

Styles are not included. Here is a basic CSS setup to get you started.

```css
[data-orbit-tabs] [role="tablist"] {
    min-width: 100%;
    border-bottom: 1px solid lightgray;
}

[data-orbit-tabs] [role="tab"],
[data-orbit-tabs] [role="tab"]:focus,
[data-orbit-tabs] [role="tab"]:hover {
    margin-bottom: -1px;
    border: none;
    border-bottom: 1px solid transparent;
    background: transparent;
    outline: none;
    cursor: pointer;
    transition: border-color 0.3s;
}

[data-orbit-tabs] [role="tab"][aria-selected="true"] {
    border-color: black; 
}

[data-orbit-tabs] [role="tab"] span.focus {
    display: inline-block;
    margin: 2px;
    padding: 4px 6px;
}

[data-orbit-tabs] [role="tab"]:focus-visible span {
    padding: 2px 4px;
    border: 2px solid rgb(36 116 214);
    border-radius: 3px;
}

[data-orbit-tabs] [role="tabpanel"] {
    min-height: 10em;
    width: 100%;
    overflow: auto;
    display: none;
    opacity: 0;
}

[data-orbit-tabs] [role="tabpanel"][aria-hidden="false"] {
    display: block;
    opacity: 1;
    transition: opacity 0.3s;
}

@starting-style {
    [data-orbit-tabs] [role="tabpanel"][aria-hidden="false"] {
        opacity: 0;
    }
}
```

-----


#### Author & Version

* **Author**: Keith Spang  
* **Version**: 1.2.0

export const component = {
    prerender: false,
    parent_id: "card_container",
    get css_class () {return "card"},
    main_container_selector: () => `#${component.parent_id}`
}
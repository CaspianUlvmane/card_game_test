export const component = {
    pre_render: false,
    parent_id: "card_container",
    get css_class () {return "card"},
    main_container_selector: () => `#${component.parent_id}`
}
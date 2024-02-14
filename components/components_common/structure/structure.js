export function get_components(data = null) {
  if (data === null) {
    data = {
      origin: structural_components.wrapper,
      component_name: "wrapper",
      parent_id: "body",
    };
  }
  const { origin, component_name, parent_id } = data;

  const component = {
    dom_id: component_name,
    parent_id,
  };

  // SPECIAL CASES
  if (parent_id === "view_box")
    component.view = component_name.substring(
      0,
      component_name.length - "_box".length
    );

  let components = [component];

  for (let child_name in origin) {
    components.push(
      ...get_components({
        origin: origin[child_name],
        component_name: child_name,
        parent_id: component_name,
      })
    );
  }

  return components;
}

const structural_components = {
  wrapper: {
    modal_box: {},
    main_box: {
      top_box: {
        logo_box: {},
        top_view_box: {},
      },
      menu_box: {},
      bottom_box: {
        deck_box: {},
        hand_box: {},
        discard_box: {},
        energy_box: {},
      },
      background_box: {
        bg_box_1: {},
        bg_box_2: {},
      },
    },
  },
};

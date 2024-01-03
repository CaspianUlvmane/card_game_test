
export function get_components (data = null)
{
  if (data === null) {
    data = {
      origin: structural_components.wrapper,
      component_name: "wrapper",
      parent_id: "body"
    };
  }
  const { origin, component_name, parent_id } = data;

  const component = 
  {
    dom_id: component_name,
    parent_id,
  };

  // SPECIAL CASES
  if (parent_id === "view_box") component.view = component_name.substring(0, component_name.length - "_box".length);

  let components = [component];

  for (let child_name in origin) 
  {
    components.push(
      ...get_components(
        { 
          origin: origin[child_name],
          component_name: child_name,
          parent_id: component_name,
        }));    
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
        user_box: {},
        burger_box: {}
      },
      view_box: {
        study_box: {
          student_search_filter_box: {},
          unit_progressor: {},                
        },

        author_box: {
          author_box_top: {
            author_course_selector_box: {},
            author_course_actions_box: {},
          },
          author_course_manager_box: {
            author_course_editor_box: {},
            author_periods_box: {},
          },
          author_course_weeks_box: {},
          author_units_box: {
            author_unit_selector: {
              author_unit_header_box: {},
              author_unit_members_list_box: {},
              author_unit_new_box: {},
            },
            author_unit_editor_box: {},
          },
                    
        },
        admin_box: {
          admin_manager_box: {
            admin_users_box: {
              admin_users_heading_box: {},
              admin_users_instances_box: {},
              admin_users_new_box: {},
            },
            admin_programs_box: {
              admin_programs_heading_box: {},
              admin_programs_instances_box: {},
              admin_programs_new_box: {},
            },
            admin_courses_box: {
              admin_courses_heading_box: {},
              admin_courses_instances_box: {},
              admin_courses_new_box: {},
            },
          },
          user_editor_box: {},
        },
        test_box: {},
        preferences_box: {},
      },
    },
  }
};
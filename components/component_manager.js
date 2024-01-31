export function render (components) 
{
  
  components.forEach
  ( component => 
    {
      console.log(component);
      if (component.prerender === undefined)
      {

        const dom_type = component.dom_type || "div";
        const dom = document.createElement(dom_type);
        component.DOM = dom;
        dom.id = component.dom_id;

        const parent_dom = component.parent_id === "body" ?
                              document.body :
                              document.getElementById(component.parent_id);
        parent_dom.append(dom);

      }

      if (component.render)
      {
        component.render();
      }
    }); 
}

export async function init (component)
{
  if (component.init) await component.init();
}
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Razor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Rules
{
    public class FeatureViewLocationExpander : IViewLocationExpander
    {
        public void PopulateValues(ViewLocationExpanderContext context)
        {
        }

        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        {
            // {0} - Action Name
            // {1} - Controller Name
            // {2} - Area Name
            // {3} - Feature Name

            // ??
            // controller is the same name as the feature
            var actionDescriptor = context.ActionContext.ActionDescriptor as ControllerActionDescriptor;
            var feature = actionDescriptor.Properties["feature"] as string;

            yield return string.Concat("/Features/", feature, "/{1}/{0}.cshtml");
            yield return string.Concat("/Features/", feature, "/{0}.cshtml");
            yield return "/Features/Shared/{0}.cshtml";
        }

        
    }
}

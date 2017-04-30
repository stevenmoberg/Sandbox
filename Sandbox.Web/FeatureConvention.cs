using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Rules
{
    public class FeatureConvention : IControllerModelConvention
    {
        public void Apply(ControllerModel controller)
        {
            var feature = GetFeatureName(controller.ControllerType);
            controller.Properties.Add("feature", feature);
        }

        private string GetFeatureName(TypeInfo controllerType)
        {
            string[] tokens = controllerType.FullName.Split('.');
            var featureIndex = Array.IndexOf(tokens, "Features");
            if (featureIndex < 0 || featureIndex == tokens.Length)
                return string.Empty;

            // 1 after "Features" directory
            return tokens[featureIndex + 1];
        }
    }
}

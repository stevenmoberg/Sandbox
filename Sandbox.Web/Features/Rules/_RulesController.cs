using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rules.Features.Rules
{
    public class RulesController : Controller
    {

        public IActionResult Editor()
        {
            return View();
        }
    }
}

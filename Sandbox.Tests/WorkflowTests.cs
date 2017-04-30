using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Activities.Statements;
using System.Activities;
using System.IO;

namespace Sandbox.Tests
{
    [TestClass]
    public class WorkflowTests
    {
        [TestMethod]
        public void TestMethod1()
        {
            var sw = new StringWriter();
            Console.SetOut(sw);

            var wf = new Sequence
            {
                Activities =
                {
                    new WriteLine { Text = "Hello" },
                    new WriteLine { Text = "World" }
                }
            };

            WorkflowInvoker.Invoke(wf);

            Assert.IsTrue(string.Compare("Hello\r\nWorld\r\n", sw.GetStringBuilder().ToString()) == 0, "Incorrect string written");
        }
    }
}

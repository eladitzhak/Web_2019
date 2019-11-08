using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace OnlineCalculator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        [HttpGet("GetFiveRandomNumbers")]
        public List<int> GetFiveRandomNumbers()
        {
            var numbers = new List<int>();
            var rnd = new Random();
            int count = 0;

            while (count < 5)
            {
                int newNum = rnd.Next(1, 21); // generate a random number between 1- 20

                if (!numbers.Contains(newNum))
                {
                    numbers.Add(newNum);
                    count++;
                }
            }

            return numbers;
        }

        [HttpPost("reverseSentence")]
        public string Post([FromBody] string inputStr)
        {
            return string.Join(" ", inputStr.Split(" ").Reverse());
        }

        [HttpPost("wordsLengthInSentence")]
        public int wordsLengthInSentence([FromBody] string inputStr)
        {
            string [] strSplit;
            strSplit = inputStr.Split(" ");
            int i = 0;
            foreach (string item in strSplit)
            {
                if ( !string.IsNullOrEmpty(item))
                    i++;
            }
            return i;
        }

        [HttpPost("getWordsInOddPositions")]
        public string getWordsInOddPositions([FromBody] string sentence)
        {
            List<string> fixString = new List<string>();
            foreach (string item in sentence.Split(" "))
            {
                if (!string.IsNullOrEmpty(item))
                {
                    fixString.Add(item);
                }
            }
                       
            for (int i = 1; i < fixString.Count; i +=1)
            {
                fixString.Remove(fixString[i]);
            }
            
            return string.Join(" ",fixString);
        }
        [HttpPost("getHigherNumberOfWord")]
        public int getHigherNumberOfWord([FromBody] string words)
        {
            /////assuming words are case sensitive
            List<String> fixString = new List<string>();
           
            foreach (string item in words.Split(" "))
            {
                if (!string.IsNullOrEmpty(item))
                {
                    fixString.Add(item);
                }
            }
            int count = 0;
            int j = 0;
            int bigger = 0;
            foreach(string word in fixString)
            {
                j = 0;
                while ((j = fixString.IndexOf(word,j))!= -1)
                { 
                    
                    count ++;
                    j++;
                    
                }
                bigger=(count > bigger) ? count : bigger; 
                count = 0;
                
            }
            return bigger;
        }
        [HttpPost("replaceWordsWithLettersCount")]
        public List <int> replaceWordsWithLettersCount([FromBody] string sentence)
        {
            List<int> countResult = new List<int>();

            foreach (string item in sentence.Split(" "))
            {
                countResult.Add(item.Length);
            }

            return countResult;
        }

    }
}

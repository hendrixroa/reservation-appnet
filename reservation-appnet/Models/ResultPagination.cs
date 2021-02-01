using System;
namespace reservation_appnet.Models
{
    public class ResultPagination
    {
        public object Items { get; set; }
        public int Count { get; set; }
        public int Pages { get; set; }
        public int Page { get; set; }
    }
}
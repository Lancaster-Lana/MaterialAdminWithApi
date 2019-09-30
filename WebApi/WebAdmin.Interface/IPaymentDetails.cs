using System.Linq;
using WebAdmin.Entities;
using WebAdmin.ViewModels;

namespace WebAdmin.Interfaces
{
    public interface IPaymentDetails
    {
        IQueryable<PaymentDetailsViewModel> GetAll(QueryParameters queryParameters, int userId);
        int Count(int userId);
        bool RenewalPayment(RenewalViewModel renewalViewModel);
    }
}
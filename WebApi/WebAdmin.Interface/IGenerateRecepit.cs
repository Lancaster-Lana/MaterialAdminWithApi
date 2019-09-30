using WebAdmin.ViewModels;

namespace WebAdmin.Interfaces
{
    public interface IGenerateRecepit
    {
        GenerateRecepitViewModel Generate(int paymentId);
    }
}
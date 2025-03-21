
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NetSaas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> _products = new()
    {
        new Product { Id = 1, Name = ".NET 8 Enterprise License", Category = "Software", Price = 999.99m, Description = "Enterprise-grade license for .NET 8 development framework." },
        new Product { Id = 2, Name = "OIDC Integration Package", Category = "Service", Price = 499.99m, Description = "Complete OIDC integration service with implementation support." },
        new Product { Id = 3, Name = "Cloud Hosting - Premium", Category = "Infrastructure", Price = 199.99m, Description = "Premium cloud hosting solution for .NET applications." },
        new Product { Id = 4, Name = "Developer Support Plan", Category = "Support", Price = 299.99m, Description = "24/7 developer support for your .NET applications." },
        new Product { Id = 5, Name = "Authentication Middleware", Category = "Software", Price = 149.99m, Description = "Advanced authentication middleware for .NET applications." },
        new Product { Id = 6, Name = "Identity Server Setup", Category = "Service", Price = 899.99m, Description = "Complete setup and configuration of Identity Server for your applications." }
    };

    private readonly ILogger<ProductsController> _logger;

    public ProductsController(ILogger<ProductsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAll()
    {
        _logger.LogInformation("Retrieved all products at {time}", DateTimeOffset.UtcNow);
        return Ok(_products);
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetById(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        
        if (product == null)
        {
            _logger.LogWarning("Product with ID {id} not found", id);
            return NotFound();
        }

        _logger.LogInformation("Retrieved product {id} at {time}", id, DateTimeOffset.UtcNow);
        return Ok(product);
    }

    [HttpPost("analyze")]
    public ActionResult<ProductAnalysis> AnalyzeProduct([FromBody] AnalyzeRequest request)
    {
        var product = _products.FirstOrDefault(p => p.Id == request.ProductId);
        
        if (product == null)
        {
            return NotFound();
        }

        // This would typically call an AI service or other analysis logic
        var analysis = new ProductAnalysis
        {
            ProductId = product.Id,
            Name = product.Name,
            Category = product.Category,
            Price = product.Price.ToString("C"),
            Recommendation = GetRecommendation(product),
            ConfidenceScore = CalculateConfidenceScore(product)
        };

        return Ok(analysis);
    }

    private string GetRecommendation(Product product)
    {
        return product.Category switch
        {
            "Software" => "Highly recommended for enterprise development teams. Consider bundling with support.",
            "Service" => "Recommended for organizations with complex identity requirements.",
            "Infrastructure" => "Essential for applications with high availability requirements.",
            "Support" => "Recommended for teams without dedicated DevOps personnel.",
            _ => "Standard recommendation based on customer feedback."
        };
    }

    private double CalculateConfidenceScore(Product product)
    {
        // Simple simulation of confidence scoring
        var baseScore = 0.75;
        
        // Products above a certain price point get a higher confidence score
        if (product.Price > 500)
        {
            baseScore += 0.15;
        }
        else if (product.Price > 200)
        {
            baseScore += 0.08;
        }

        // Certain categories have higher confidence
        if (product.Category == "Software" || product.Category == "Service")
        {
            baseScore += 0.07;
        }

        // Ensure the score doesn't exceed 1.0
        return Math.Min(baseScore, 0.97);
    }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Description { get; set; } = string.Empty;
}

public class ProductAnalysis
{
    public int ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Price { get; set; } = string.Empty;
    public string Recommendation { get; set; } = string.Empty;
    public double ConfidenceScore { get; set; }
}

public class AnalyzeRequest
{
    public int ProductId { get; set; }
}

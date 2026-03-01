# E-Commerce Component Patterns Reference

## Product Card Component

```tsx
// Reusable product card with hover interactions
<div className="group relative overflow-hidden rounded-lg border bg-card">
  {/* Image with hover zoom */}
  <div className="relative aspect-square overflow-hidden">
    <img
      src={product.image}
      alt={`${product.name} - front view`}
      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
    />
    {/* Wishlist button */}
    <button
      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm"
      aria-label={`Add ${product.name} to wishlist`}
    >
      <Heart className="h-4 w-4" />
    </button>
    {/* Quick-add on hover */}
    <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-200 group-hover:translate-y-0">
      <Button className="w-full rounded-none">Quick Add</Button>
    </div>
  </div>
  {/* Product info */}
  <div className="p-4">
    <h3 className="font-medium text-sm truncate">{product.name}</h3>
    <div className="flex items-center gap-2 mt-1">
      {product.salePrice ? (
        <>
          <span className="font-bold text-accent">${product.salePrice}</span>
          <span className="text-sm text-muted-foreground line-through">${product.price}</span>
        </>
      ) : (
        <span className="font-bold">${product.price}</span>
      )}
    </div>
  </div>
</div>
```

## Cart Drawer (shadcn Sheet)

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" className="relative">
      <ShoppingCart className="h-5 w-5" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-in zoom-in-50">
          {cartCount}
        </span>
      )}
    </Button>
  </SheetTrigger>
  <SheetContent className="flex flex-col">
    <SheetHeader>
      <SheetTitle>Cart ({cartCount})</SheetTitle>
    </SheetHeader>
    <div className="flex-1 overflow-y-auto">
      {/* Cart items */}
    </div>
    <div className="border-t pt-4">
      <div className="flex justify-between mb-4">
        <span className="font-medium">Total</span>
        <span className="font-bold tabular-nums">${total}</span>
      </div>
      <Button className="w-full" size="lg">Checkout</Button>
    </div>
  </SheetContent>
</Sheet>
```

## Quantity Selector

```tsx
<div className="flex items-center border rounded-md">
  <Button
    variant="ghost"
    size="icon"
    className="h-8 w-8"
    onClick={() => setQty(Math.max(1, qty - 1))}
    disabled={qty <= 1}
    aria-label="Decrease quantity"
  >
    <Minus className="h-3 w-3" />
  </Button>
  <span className="w-8 text-center tabular-nums text-sm">{qty}</span>
  <Button
    variant="ghost"
    size="icon"
    className="h-8 w-8"
    onClick={() => setQty(qty + 1)}
    aria-label="Increase quantity"
  >
    <Plus className="h-3 w-3" />
  </Button>
</div>
```

## Multi-Step Checkout Progress

```tsx
const steps = ['Shipping', 'Payment', 'Review']

<div className="flex items-center justify-center gap-2">
  {steps.map((step, i) => (
    <React.Fragment key={step}>
      <div className={cn(
        "flex items-center gap-2",
        i <= currentStep ? "text-primary" : "text-muted-foreground"
      )}>
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
          i < currentStep && "bg-primary text-primary-foreground",
          i === currentStep && "border-2 border-primary",
          i > currentStep && "border border-muted-foreground"
        )}>
          {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
        </div>
        <span className="text-sm font-medium hidden sm:inline">{step}</span>
      </div>
      {i < steps.length - 1 && (
        <div className={cn(
          "h-px w-12",
          i < currentStep ? "bg-primary" : "bg-muted"
        )} />
      )}
    </React.Fragment>
  ))}
</div>
```

## Trust Badges Section

```tsx
<div className="flex items-center justify-center gap-6 p-4 bg-muted/50 rounded-lg border">
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Shield className="h-4 w-4" />
    <span>Secure Checkout</span>
  </div>
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Truck className="h-4 w-4" />
    <span>Free Shipping $50+</span>
  </div>
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <RotateCcw className="h-4 w-4" />
    <span>30-Day Returns</span>
  </div>
</div>
```

## Brand Tone Color Palettes

### Luxury
```css
--bg: #0a0e1a;
--text: #f5f0e8;
--accent: #c9a96e;
--muted: #2a2d3a;
```

### Playful
```css
--bg: #fef7ff;
--text: #1a1a2e;
--accent: #f472b6;
--secondary: #a78bfa;
```

### Minimalist
```css
--bg: #ffffff;
--text: #1a1a1a;
--accent: #2563eb;
--muted: #f5f5f5;
```

### Bold
```css
--bg: #ffffff;
--text: #000000;
--accent: #ef4444;
--border: 2px solid #000;
--shadow: 4px 4px 0 #000;
```

### Eco-conscious
```css
--bg: #faf7f2;
--text: #2d3b2d;
--accent: #b45309;
--secondary: #6b8f71;
```

## Supabase Product Schema

```sql
-- Recommended Supabase table structure
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  sale_price decimal(10,2),
  category text not null,
  store_type text not null,
  images text[] default '{}',
  in_stock boolean default true,
  stock_count integer default 0,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now()
);

create table cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  product_id uuid references products(id),
  quantity integer default 1,
  created_at timestamp with time zone default now()
);
```

## Stripe Integration Notes

- Use `@stripe/stripe-js` and `@stripe/react-stripe-js` packages.
- Create Stripe checkout sessions via Supabase Edge Functions.
- Never handle raw card numbers in the frontend — use Stripe Elements.
- Webhook endpoint in Supabase Edge Function to handle `checkout.session.completed`.

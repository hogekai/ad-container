# AdContainer

AdContainer is a powerful web component that allows third-party content, such as advertisements, to run in a completely isolated environment by simply wrapping it with a simple tag.

## Key Features

- **Easy Integration**: Just wrap your content with the `<ad-container>` tag.
- **Complete Isolation**: Provides a fully separate `window` object and execution context.
- **Security**: Prevents third-party scripts from accessing or interfering with the main page.
- **User-Friendly**: No complex setup or configuration required.

## Installation

```bash
npm install ad-container
```

## Usage

1. Import the component:

```html
<script src="https://cdn.jsdelivr.net/npm/ad-container@latest/dist/ad-container.umd.js"></script>
```

```javascript
import 'ad-container';
```

Note: Make sure to complete the loading before the tag you're using (<ad-container>).

2. Use it in your HTML:

```html
<ad-container>
  <!-- Place your third-party content or ad code here -->
  <script>
    // This script runs in an isolated environment
    console.log(window); // This is a separate window object
  </script>
</ad-container>
```

## How It Works

AdContainer creates a sandboxed iframe for each instance, providing a new isolated `window` object and execution context. This ensures that code within the `<ad-container>` cannot interact with or affect the main page, improving security and stability.

## Security Note

While AdContainer provides strong isolation, always exercise caution when including third-party content in your application.

## License

This project is provided under the MIT License. For more details, see the [LICENSE](../LICENSE) file.
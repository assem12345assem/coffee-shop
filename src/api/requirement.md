Catalog Page Implementation (150 points - Total) 📚

1. Display Product List (45 points) 📋

(25 points) Use the commercetools API to fetch a list of products with essential details, such as name, image, and description. RSS-ECOMM-3_01 💻
(20 points) Display prices with and without discount for discounted products, ensuring that the discounted price is visually distinct and clearly indicates that it is the current price. RSS-ECOMM-3_02 💵 2. Product Filtering, Sorting, and Searching (65 points) 🔍

(30 points) Utilize the commercetools API to offer robust filtering options for users to refine the product list based on attributes such as price range, brand, color, size, or other relevant characteristics. RSS-ECOMM-3_03 🗂️
(15 points) Enable users to sort the product list by various properties, such as price and name. RSS-ECOMM-3_04 🔄
(20 points) Implement an efficient and user-friendly search feature that allows users to quickly find and display relevant products based on their search query using the chosen API. RSS-ECOMM-3_05 🔎 3. Interactive Product Cards (15 points) 🃏

(10 points) Design product cards that change their appearance when the user hovers over them, enhancing the browsing experience. RSS-ECOMM-3_06 👆
(5 points) Upon clicking a product card, redirect the user to a detailed product information page for the selected product. RSS-ECOMM-3_07 🖱️ 4. Category Navigation (25 points) 🧭

(25 points) Implement easy-to-use and clear navigation options for users to explore and switch between different product categories or subcategories using the commercetools API. RSS-ECOMM-3_08 🗺️
Detailed Product Page Implementation (100 points - Total) 🔎

1. Display Product Information (65 points) 📝

(25 points) Use the commercetools API to fetch and display the product name, description, and images on the Detailed Product page. RSS-ECOMM-3_09 🖼️
(25 points) Implement an image slider for product images fetched from the chosen API, allowing users to view multiple images of the product. RSS-ECOMM-3_10 🎞️
(15 points) Display the product price fetched from the chosen API, and if the product is on sale, display both the original and discounted prices. RSS-ECOMM-3_11 💰 2. Enlarged Image Modal with Slider (35 points) 🖼️🔍

(20 points) Allow users to click on the product image to open an enlarged version of the image in a modal window. RSS-ECOMM-3_12 🔍
(15 points) Enable users to navigate through all product images from the commercetools API using a slider inside the modal window. RSS-ECOMM-3_13 🚀
User Profile Page Implementation (70 points - Total) 👥

1. Display User Profile Information (30 points) 📋

(10 points) Present the user's personal information, including first name, last name, date of birth, and a list of their addresses in the User Profile page. RSS-ECOMM-3_14 📄
(20 points) Provide a user-friendly interface for users to switch to an edit mode, where they can update their personal details, email, and addresses. RSS-ECOMM-3_15 ✏️ 2. Edit User Profile Information (40 points) ✏️

(10 points) In the edit mode, allow users to update their personal information, including first name, last name, and date of birth and email. RSS-ECOMM-3_16 ✍️
(15 points) Enable users to change their password. RSS-ECOMM-3_17 🔑
(15 points) Allow users to manage their addresses, including adding new addresses, deleting existing ones, and updating address details. RSS-ECOMM-3_18 🏠
Routing Implementation (40 points - Total) 🛣️

(25 points) Implement routing for navigation between Catalog page, Product detail page. RSS-ECOMM-3_19 🚦
(15 points) Implement routing for navigation to User Profile page. RSS-ECOMM-3_20 🚧
Evaluation Criteria for Header (10 points - Total) 🖥️

(5 points) Consistent header layout with necessary information like branding and user navigation across all the pages. RSS-ECOMM-3_21 📐
(5 points) User Profile link or button in the header, enabling navigation to User Profile page. RSS-ECOMM-3_22 ➡️
Penalties for Cross-Check Criteria (70 points - Total): ❌

Absence of Responsive Application Design (20 points): If the application does not provide a responsive layout suitable for various devices and screen sizes, a penalty of 20 points will be applied. 📱🖥️🛑

Errors in the Console (20 points): Except for request errors, console errors, including favicon error, will result in a penalty of 20 points. Ensure your code is debugged and free of unnecessary errors for a smooth user experience. 🐛🔍🛑

Usage of Data from commercetools-sunrise-data (30 points): If a project is found to be using data directly from commercetools-sunrise-data, a penalty of 30 points will be applied. The intent is to encourage developers to use unique data sources and avoid ready-made datasets. 📊❌🛑

Please note that these penalties will be deducted from the final score. Strive for high-quality, error-free code and a responsive, user-friendly design for the best outcome. 🌟🏆💪

# Issue RSS-ECOMM-3_01: Fetch and Display Product List using Commercetools API (25 points) 🎯

🖊️ Description

The application should utilize the commercetools API 🗂️ to fetch a list of products 📦 with essential details such as the product name 🏷️, image 🖼️, and description 📝. The data fetched from the API should be parsed and organized to be displayed on the Catalog Product page 📄, where users can view the list 📋 and select individual products for more detailed information.

🔧 Implementation Details

API Setup: Set up the commercetools API in your project, following the guidelines provided in the API documentation 📘. Ensure you have the necessary credentials 🔐 and permissions to fetch product data.
Fetching Data: Use the appropriate commercetools API endpoints to fetch product data. The GET /{projectKey}/products endpoint could be useful for this task. Remember to handle potential errors in data fetching, like network errors 🌐 or API limitations ⛔.
Data Parsing and Display: Parse the fetched data to extract the necessary product details: name, image, and description. Display this data on the Catalog Product page in a user-friendly format 🙋‍♂️.
💡 Visual Implementation Ideas

Product cards: Display each product on the Catalog Product page in a card-like format 🎴, with the product image, name, and brief description visible.
Product image: The product image should be clear and accurately represent the product.
Product name and description: The product name should be in a larger, bold font to quickly draw the user's attention 👁️. The product description should be brief, informative, and provide necessary details to understand the product at a glance.
✅ Acceptance Criteria

The application successfully fetches a list of products from the commercetools API, including the essential details: name, image, and description.
The fetched products are displayed on the Catalog Product page in an organized, easy-to-browse manner 🧹.
Each product card includes the product's image, name, and description, and these elements are easy to identify and understand by users 👥.
🔗 Useful Links and Resources

Commercetools API documentation https://docs.commercetools.com/api
Commercetools API endpoint for fetching products https://docs.commercetools.com/api/projects/products#query-product
Working with data in commercetools https://docs.commercetools.com/api/general-concepts#data-erasure

# 🚀 Issue RSS-ECOMM-3_02: Display Prices with and Without Discount for Discounted Products (20 points) 🎯

🖊️ Description

For discounted products 💸, the application should display both the original and the discounted price 💰. The discounted price, which is the current price the customer needs to pay, should be made visually distinct to highlight the discount and value for the customer 👀.

🔧 Implementation Details

Fetching Discounted Product Data: Make use of the commercetools API to fetch product data, which should include the original price and any available discounts. It may require fetching price data separately or in combination with product details.
Parsing Product Price Data: Extract the necessary price and discount information from the fetched data 💡. This may include the original price, the discount amount or percentage, and the discounted price.
Calculating Discounted Price: If the API does not provide the discounted price directly, calculate it from the original price and the discount amount or percentage 🔢.
💡 Visual Implementation Ideas

Displaying Prices: Display the original price and the discounted price clearly on the product card. Ensure both prices are easily visible and understandable 👓.
Highlighting Discounted Price: Make the discounted price visually distinct, for example, by using a different color, font size, or a badge 🏷️. The goal is to draw attention to the discounted price and highlight the savings.
Striking out the Original Price: Consider using a strikethrough for the original price to reinforce the idea that the discounted price is currently in effect 🚫.
✅ Acceptance Criteria

Both the original price and the discounted price are clearly displayed for discounted products.
The discounted price is visually distinct and clearly indicates that it is the current price the customer needs to pay.
If the original price is displayed, it should be marked in a way that clearly communicates that it is not the current price (e.g., strikethrough).
🔗 Useful Links and Resources

Commercetools API documentation
Commercetools API endpoint for fetching product prices https://docs.commercetools.com/api/projects/products#productvariantdraft
Product Discounts https://docs.commercetools.com/api/projects/productDiscounts

# 🚀 Issue RSS-ECOMM-3_03: Implement Robust Filtering Options for Product List Using commercetools API (30 points) 🎯

🖊️ Description

The application should offer a comprehensive set of filters 🎛️ allowing users to refine the product list based on various product attributes, such as price range 💰, brand 🏷️, color 🌈, size 📏, or other relevant characteristics. The filtering functionality should be implemented using the commercetools API.

🔧 Implementation Details

Fetching Product Attributes: Using the commercetools API, fetch the necessary product attributes that will serve as the basis for filters 📥. This might include, but is not limited to, attributes like price, brand, color, and size.
Designing the Filter Interface: Design a user-friendly 👍 and intuitive interface for applying filters. This could be a sidebar, a dropdown menu, or a modal window.
Applying Filters: Implement functionality that updates the product list based on the selected filters 🔄. This will involve making new API requests with filter parameters to the commercetools API.
💡 Visual Implementation Ideas

Filter Options Layout: Display filter options in a clear and organized manner 🗂️. You might want to group related filters or use visual elements like sliders for price ranges.
Active Filters Indication: Clearly indicate which filters are currently applied ✅. This could be done through highlighting, checkboxes, or some other visual cues.
Resetting Filters: Provide an easy way for users to reset the filters and view the unfiltered product list 🔄.
✅ Acceptance Criteria

A robust set of filters is available, allowing users to refine the product list based on various attributes like price range, brand, color, size, etc.
Applying a filter updates the product list to show only products that match the selected filter criteria. This updating should be done using the commercetools API.
It's clear to the user which filters are currently applied.
There is a clear and easy way for users to reset the filters.
🔗 Useful Links and Resources

Commercetools API documentation https://docs.commercetools.com/api
Commercetools API endpoint for fetching product attributes https://docs.commercetools.com/api/projects/productProjections#productprojection
Commercetools API filtering capabilities https://docs.commercetools.com/api/predicates/query

### 🎯 Issue RSS-ECOMM-3_04: Implement Sorting Functionality for Product List Using commercetools API (15 points)

#### 📋 Description

The application should offer users the ability to sort 🔢 the product list by various properties, such as price (ascending ↗️, descending ↘️) and name (alphabetically 🆎). This sorting functionality should be implemented using the commercetools API.

#### 🔨 Implementation Details

1. **Designing the Sorting Interface:** Design a user-friendly and intuitive interface for sorting. This could be a dropdown menu with different sorting options.
2. **Sorting Functionality:** Implement functionality that updates the product list based on the selected sorting option. This will involve making new API requests with sorting parameters to the commercetools API.

#### 🎨 Visual Implementation Ideas

1. **Sorting Options Layout:** Display sorting options in a clear and easily accessible manner. You could use a dropdown menu with labels clearly describing the sorting method.
2. **Active Sorting Indication:** Clearly indicate the currently selected sorting method. This could be done by highlighting the selected sorting option in the dropdown menu.

#### ✅ Acceptance Criteria

- Users can sort the product list by price (ascending, descending) and name (alphabetically).
- Applying a sorting option updates the product list to reflect the chosen sorting method. This updating should be done using the commercetools API.
- The currently active sorting method is clearly indicated to the user.

#### 🔗 Useful Links and Resources

1. [Commercetools API documentation](https://docs.commercetools.com/api)
2. [Commercetools API endpoint for sorting product list](https://docs.commercetools.com/api/projects/productProjections#productprojection)

### 🎯 Issue RSS-ECOMM-3_05: Implement Search Functionality for Product List Using commercetools API (20 points)

#### 📋 Description

The application should have an efficient 🔎 and user-friendly search feature that allows users to quickly find and display relevant products based on their search query. This search functionality should be implemented using the commercetools API.

#### 🔨 Implementation Details

1. **Search Input Field:** Provide a text input field 📝 where users can type their search queries. This field should be visible and easily accessible on the product list page.
2. **Search Functionality:** Implement a search function that uses the user's input to find and display matching products from the commercetools API. The function should handle different cases (e.g., uppercase 🔠, lowercase 🔡) and partial matches.

#### 🎨 Visual Implementation Ideas

1. **Input Field Design:** The search input field should be visible and accessible. It should be designed in a way that suggests its function (e.g., with a magnifying glass 🔍 icon).
2. **Search Result Indication:** Display search results in a clear and organized manner. You might want to highlight the matching text in the product name or description.

#### ✅ Acceptance Criteria

- Users can type search queries into a text input field on the product list page.
- Based on the user's input, matching products are fetched from the commercetools API and displayed on the product list page.

#### 🔗 Useful Links and Resources

1. [Commercetools API documentation](https://docs.commercetools.com/api)
2. [Commercetools API endpoint for searching product list](https://docs.commercetools.com/api/projects/productProjections)

### 🎯 Issue RSS-ECOMM-3_06: Interactive Product Cards (10 points)

#### 📋 Description

Product cards 🃏 displayed on the product list page should change their appearance when the user hovers over them. This will enhance the browsing experience by providing visual feedback 📊 and making the interface more dynamic.

#### 🔨 Implementation Details

1. **Product Card Design:** The product card should display key details about the product (such as name, image, and price 💰). It should be aesthetically pleasing and match the overall design theme of the website.
2. **Hover Effect:** When the user hovers over a product card, its appearance should change in a way that indicates it is being interacted with. This could be accomplished with changes in color 🎨, shadow, scale, or other visual properties.

#### 🎨 Visual Implementation Ideas

1. **Color Change:** Alter the background color 🌈 of the product card on hover.
2. **Shadow Effect:** Add or increase a shadow effect to give the impression that the card is being lifted off the page.
3. **Scale Transformation:** Slightly increase the size of the product card to draw attention to it.

#### ✅ Acceptance Criteria

- Product cards on the product list page display key product details.
- When a user hovers over a product card, its appearance changes to indicate it is being interacted with.

#### 🔗 Useful Links and Resources

1. [CSS hover effects](https://www.w3schools.com/css/css3_transitions.asp)
2. [Creating 3D effects with CSS](https://www.w3schools.com/css/css3_3dtransforms.asp)

### 🎯 Issue RSS-ECOMM-3_07: Redirect to Detailed Product Page (5 points)

#### 📋 Description

When users click on a product card 🃏, they should be redirected 🔄 to a detailed product information page 📄 for the selected product.

#### 🔨 Implementation Details

1. **Product Link:** Each product card should be a clickable entity 👆, ideally implemented as a link 🔗 that directs to the corresponding product detail page. The clickable area can be the entire card or just a part of it, such as the product's name or an individual "View Details" button.

#### ✅ Acceptance Criteria

- Clicking on a product card in the product list page directs the user to the detailed product page for the selected product.

#### 🔗 Useful Links and Resources

1. [Creating hyperlinks in HTML](https://www.w3schools.com/html/html_links.asp)

### 🎯 Issue RSS-ECOMM-3_08: Implement Category 🏷️ and Breadcrumb Navigation 🍞 (25 points)

#### 📋 Description

Our goal is to make the product exploration process 🕵️ easy and efficient. We need to implement clear and user-friendly navigation 🧭 that enables users to explore and switch between different product categories or subcategories. In addition, we need to provide breadcrumb navigation 🍞 to help users understand their current location 📍 within the category hierarchy.

#### 🔨 Implementation Details

1. **Category Display:** The navigation options should be prominently displayed, possibly as a side panel 📝 or a drop-down menu ⬇️. This might vary depending on the chosen design 🎨.
2. **API Usage:** Make use of the commercetools API 💻, or any other simple API, to fetch the categories/subcategories information. The API call should return a list 📃 of all available categories/subcategories.
3. **Navigation Implementation:** Each category or subcategory should be clickable 👆, and when clicked, the product list should be updated to reflect the selected category or subcategory.
4. **Breadcrumb Navigation:** Breadcrumb navigation 🍞 should be present on all category pages to give users a clear understanding of the category hierarchy and their current location 📍 within it. Each segment of the breadcrumb should be a clickable link 🔗 that takes the user to the corresponding category or subcategory page.
5. **Category Hierarchy:** Ensure that the category hierarchy is accurately reflected in the breadcrumb navigation 🍞. This will likely involve fetching category data from the chosen API (commercetools or another simple API) and dynamically generating the breadcrumb links based on this data.

#### ✅ Acceptance Criteria

- User-friendly navigation for product categories and subcategories is implemented and clearly visible 🔍.
- Users can switch between different product categories and subcategories.
- Clicking on a category or subcategory updates the product list accordingly 🔄.
- Breadcrumb navigation or a similar navigational aid is present on all category pages, accurately reflecting the category hierarchy and the user's current location within it.
- Clicking on a segment of the breadcrumb navigation takes the user to the corresponding category or subcategory page.

#### 🔗 Useful Links and Resources

1. [Commercetools API Documentation](https://docs.commercetools.com/api)
2. [Commercetools Modeling Categories](https://docs.commercetools.com/tutorials/categories)
3. [Product Projection Search](https://docs.commercetools.com/api/projects/products-search#product-projection-search)
4. [Breadcrumb Navigation](https://blog.hubspot.com/marketing/navigation-breadcrumbs)
5. [Breadcrumb in HTML and CSS](https://www.w3schools.com/howto/howto_css_breadcrumbs.asp)
6. [commercetools Categories API](https://docs.commercetools.com/api/projects/categories)

### 🎯 Issue RSS-ECOMM-3_09: Fetch and Display Product Details using Commercetools API (25 points)

#### 📋 Description

The application should utilize the commercetools API 💻 to fetch the detailed information such as the product name 🏷️, description 📝, and images 🖼️ of a selected product. The data fetched from the API should be parsed and organized to be displayed on the Detailed Product page 📄, where users can view all details of the selected product.

#### 🔨 Implementation Details

1. **API Setup:** Use the already set up commercetools API in your project to fetch detailed product data. Make sure you have the necessary credentials 🔑 and permissions 🛡️.
2. **Fetching Data:** Use the appropriate commercetools API endpoints to fetch product detail data. The `GET /{projectKey}/products/{ID}` or `GET /{projectKey}/products/key={key}` endpoints could be useful for this task. Remember to handle potential errors ❌ in data fetching, like network errors 🕸️ or API limitations 🚧.
3. **Data Parsing and Display:** Parse the fetched data to extract the necessary product details: name, description, and images. Display this data on the Detailed Product page in a user-friendly format 🖥️.

#### 🎨 Visual Implementation Ideas

1. **Product Details:** Display the product name, description, and images on the Detailed Product page in an easy-to-read and comprehensive manner 📖.
2. **Product Images:** The product images should be clear and accurately represent the product. Users should have the possibility to see multiple images if available 🖼️.
3. **Product Name and Description:** The product name should be in a larger, bold font to quickly draw the user's attention. The product description should be detailed, informative, and provide all necessary details for the user to understand the product completely 📚.

#### ✅ Acceptance Criteria

- The application successfully fetches detailed information of a product from the commercetools API, including the essential details: name, description, images and other attributes ✨.
- The fetched product details are displayed on the Detailed Product page in an organized and easy-to-understand manner 👍.
- The Detailed Product page includes the product's images, name, and description, and these elements are easy to identify and understand by users 👥.

#### 🔗 Useful Links and Resources

1. [Commercetools API endpoint for fetching product by Key](https://docs.commercetools.com/api/projects/products#get-product-by-key)
2. [Commercetools API endpoint for fetching product by ID](https://docs.commercetools.com/api/projects/products#get-product-by-id)

### 🎯 Issue RSS-ECOMM-3_10: Implement an Image Slider for Product Images (25 points)

#### 📋 Description

As part of the detailed product page, the application should implement an image slider 🎞️ that allows users to view multiple images of a selected product. This image slider should be populated with images fetched from the commercetools API 💻, or any other simple API chosen by the team.

#### 🔨 Implementation Details

1. **Fetch Product Images:** For a given product, fetch all associated images from the API. This might involve the the `GET /{projectKey}/products/{ID}` or `GET /{projectKey}/products/key={key}` endpoints in the case of commercetools API, which should include image URLs in the product data.
2. **Implement Image Slider:** Implement a user-friendly image slider that can handle multiple images. The slider should allow users to manually cycle through the images, and it should gracefully handle the case of a product with only a single image.

#### 🎨 Visual Implementation Ideas

1. **Interactive Slider:** The image slider should be interactive, letting users control which image is currently displayed. This might involve arrows on either side of the image, or a series of clickable dots representing each image.
2. **Image Layout:** The images should be presented in a clean and organized way. Consider the size and aspect ratio of the images and how they will fit into the overall design of the page.

#### ✅ Acceptance Criteria

- The application successfully fetches multiple images for a product from the chosen API, when available.
- An image slider is implemented on the Detailed Product page, and can handle multiple images. The slider allows users to manually control which image is displayed.
- If a product has only a single image, the slider gracefully degrades to simply display that image without any unnecessary slider controls.

#### 🔗 Useful Links and Resources

1. [Commercetools API endpoint for fetching product by ID](https://docs.commercetools.com/api/projects/products#get-product-by-id)
2. [Commercetools API endpoint for fetching product by ID](https://docs.commercetools.com/api/projects/products#get-product-by-id)
3. [Swiper](https://swiperjs.com/), a modern mobile touch slider

### 🎯 Issue RSS-ECOMM-3_11: Display Product Price and Sale Price (15 points)

#### 📋 Description

The application should fetch and display the price 💲 for each product from the chosen API on the Detailed Product page. If the product is on sale, both the original price and the sale price should be displayed. The sale price should be clearly distinguished as the current price of the product.

#### 🔨 Implementation Details

1. **Fetch Product Price:** Fetch the price details of the product from the chosen API. This might involve using the `GET /{projectKey}/products/{ID}` or `GET /{projectKey}/products/key={key}` endpoints for the commercetools API, which should include product price information.
2. **Display Price:** Display the price of the product on the Detailed Product page. Make sure the price is formatted correctly and easy to read.
3. **Display Sale Price:** If the product is on sale, fetch the sale price from the API and display it alongside the original price. Make sure it's clear which price is the current price and which price is the original price before the sale.

#### 🎨 Visual Implementation Ideas

1. **Sale Price Highlight:** When a product is on sale, the sale price could be highlighted in a bright color 🌈 to draw attention. The original price might be crossed out next to it to make clear that it's no longer the current price.
2. **Price Formatting:** Both prices should be displayed with the appropriate currency symbol and two decimal places, regardless of whether the price ends in .00.

#### ✅ Acceptance Criteria

- The application successfully fetches and displays the price for each product from the chosen API.
- If the product is on sale, both the original price and the sale price are displayed. The sale price is clearly distinguished as the current price of the product.

#### 🔗 Useful Links and Resources

1. [Commercetools API endpoint for fetching product by ID](https://docs.commercetools.com/api/projects/products#get-product-by-id)
2. [Formatting currency in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
3. [Commercetools API endpoint for fetching product by ID](https://docs.commercetools.com/api/projects/products#get-product-by-id)

### 🎯 Issue RSS-ECOMM-3_12: Implement Enlarged Image Modal (20 points)

#### 📋 Description

When users click on the product image 🖼️ in the Detailed Product Page, a modal window should pop up displaying an enlarged version of the image. This feature would allow users to view the product image in more detail.

#### 🔨 Implementation Details

1. **Image Modal:** Implement a modal window that can display an enlarged version of a product image. Consider using a library or framework feature to handle modals, or build one from scratch. The modal should include a way for the user to close it, such as an "X" button in the corner.
2. **Image Click Event:** Attach an event listener to the product image that triggers the modal to open with the enlarged image when the image is clicked.
3. **Image Sizing:** Make sure that the enlarged image in the modal is significantly larger than the product image, but still fits within the viewport. You may need to limit the size of the image or make the modal scrollable if the image is too large.

#### 🎨 Visual Implementation Ideas

1. **Modal Background:** When the modal opens, darken or blur the rest of the page behind the modal to help it stand out.
2. **Close Button:** Make sure the close button is easily visible and clearly indicates its purpose.

#### ✅ Acceptance Criteria

- The product image triggers a modal to open when it is clicked.
- The modal displays an enlarged version of the product image.
- There is a clear way for the user to close the modal.

#### 🔗 Useful Links and Resources

1. [Modal windows in JavaScript](https://www.w3schools.com/howto/howto_css_modals.asp)
2. [Handling click events in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)

### 🎯 Issue RSS-ECOMM-3_13: Implement Image Slider in Enlarged Image Modal (15 points)

#### 📋 Description

The enlarged image modal should not only display a single product image 🖼️, but should also include a slider feature, enabling users to navigate through all product images fetched from the chosen API. This allows users to view all images of a product without having to close the modal.

#### 🔨 Implementation Details

1. **Slider Setup:** Implement a slider within the enlarged image modal. This could be a custom-built slider or one from a library or framework. The slider should display one image at a time and have navigational controls to cycle through the images.
2. **Image Fetching:** Fetch all product images from the chosen API and include them in the slider. Ensure that these images are appropriately sized and formatted for the slider.
3. **Navigation Controls:** Implement controls (like arrows or dots) to allow users to navigate through the images in the slider. These controls should be easily visible and intuitive to use.

#### 🎨 Visual Implementation Ideas

1. **Slider Design:** The slider should be clean and straightforward, focusing attention on the images themselves. Avoid unnecessary decorations or elements that might distract from the product images.
2. **Navigation Controls:** The navigation controls should be designed in a way that they do not obscure the images but are still easily accessible for the user.

#### ✅ Acceptance Criteria

- The enlarged image modal includes a slider that displays all product images fetched from the API.
- Users can navigate through the images using the slider controls.

#### 🔗 Useful Links and Resources

1. [Simple carousel example](https://www.youtube.com/watch?v=2xP-HahCtio)
2. [Swiper.js - Most modern mobile touch slider](https://swiperjs.com/)
3. [Images](https://docs.commercetools.com/api/projects/products#ctp:api:type:Image)

### 🎯 Issue RSS-ECOMM-3_14: Present User's Personal Information on User Profile Page (10 points)

#### 📋 Description

The User Profile page should display the user's personal information 📝. This is an essential feature that allows users to view and verify their personal details. It also enhances the personalization aspect of the user experience.

#### 🔨 Implementation Details

1. **User Information:** Display the user's first name, last name, and date of birth 📅 on the User Profile page.
2. **User Addresses:** List all of the user's saved addresses 🏠 on the User Profile page. Each address entry should display all relevant information (street, city, state, zip code, country). Also, clearly indicate which address is set as the default billing address and which one is the default shipping address. Use appropriate labels or markers to distinguish them.

#### 🎨 Visual Implementation Ideas

1. **User Info Layout:** You might want to divide the User Profile page into different sections for clarity. For example, one section could be dedicated to personal information (name, date of birth), while another could list user addresses.
2. **Highlighting Default Addresses:** Clearly differentiate the default shipping and billing addresses from the rest. This could be achieved by using different background colors, adding a label, or placing these addresses at the top of the list.

#### ✅ Acceptance Criteria

- The User Profile page displays the user's first name, last name, and date of birth.
- The User Profile page lists all saved addresses for the user, with all relevant information for each address.
- The default billing and shipping addresses are clearly indicated on the User Profile page.

#### 🔗 Useful Links and Resources

1. [commercetools: Working with Customers](https://docs.commercetools.com/api/projects/customers)

### 🎯 Issue RSS-ECOMM-3_15: Implement Edit Mode for Updating User Details on Profile Page (20 points)

#### 📋 Description

It's essential for users to have the ability to update their personal information 📝, including personal details and addresses. To facilitate this, provide a user-friendly interface that allows users to switch to an "edit mode" ✏️ on the User Profile page. This edit mode could be implemented as inline editing within the existing page layout or as a modal pop-up window.

#### 🔨 Implementation Details

1. **Edit Mode Toggle:** Implement a clear and intuitive way for users to enter and exit the edit mode. This could be a button, a link, or any other interactive element.
2. **Edit Mode Design:** The edit mode could take the form of inline editing or a modal pop-up window. In either case, it should be visually distinct from the regular view mode.
3. **Saving Changes:** Provide a clear way to save changes made in the edit mode. Inform the user of the success or failure of the update operation.

#### 🎨 Visual Implementation Ideas

1. **Inline Edit Mode:** If implementing inline editing, consider changing the background color of editable fields or providing visual cues such as an edit icon. Changes could be saved on a field-by-field basis or all at once using a "Save Changes" button.
2. **Modal Edit Mode:** If using a modal window for editing, ensure that the window is large enough to comfortably display all editable fields. It should also be clear how to close the window and save changes.
3. **Save Changes Button:** Make sure the "Save Changes" button is easily noticeable and accessible. You could place it at the bottom of the page or next to each editable field.
4. **Update Notifications:** Use a noticeable color and place the update notifications (success or failure) in a spot where they are easily visible. You could use green for success messages and red for failure messages.

#### ✅ Acceptance Criteria

- Users can switch to an edit mode on the User Profile page, either through inline editing or a modal window.
- Changes made in the edit mode can be saved.
- User is informed of the success or failure of the update operation.

#### 🔗 Useful Links and Resources

1. [commercetools: Update Customer by ID](https://docs.commercetools.com/api/projects/customers#update-customer-by-id)
2. [toastify-js](https://github.com/apvarun/toastify-js#readme)

### 🎯 Issue RSS-ECOMM-3_16: Implement Personal Information and Email Edit in User Profile Page (10 points)

#### 📋 Description

Users should have the capability to update their personal information 📝 and email address 📧. This feature increases user autonomy and lets users ensure their information is always up to date.

#### 🔨 Implementation Details

1. **Edit Mode:** Utilize the "edit mode" ✏️ previously implemented on the User Profile page.
2. **Updating Personal Information and Email:** While in edit mode, users should be able to update their first name, last name, date of birth, and email address.
3. **Email Validation:** Implement a check to ensure that the email address entered by the user is valid and appropriately formatted.
4. **Form Validation:** Ensure the updated personal information meets the necessary criteria (non-empty name fields, valid date for date of birth, etc.).

#### 🎨 Visual Implementation Ideas

1. **Highlight Editable Fields:** When in edit mode, highlight or otherwise visually indicate the fields that the user can edit to guide their attention.

#### ✅ Acceptance Criteria

- In the edit mode on the User Profile page, users can update their first name, last name, date of birth, and email address.
- The system appropriately validates all changes, including the validity of the email address.

#### 🔗 Useful Links and Resources

1. [commercetools: Update Customer by ID](https://docs.commercetools.com/api/projects/customers#update-customer-by-id)
2. [Form Validation with JavaScript](https://www.w3schools.com/js/js_validation.asp)
3. [Email Validation](https://www.w3schools.com/js/js_validation_api.asp)

### 🎯 Issue RSS-ECOMM-3_17: Implement Password Change in User Profile Page (15 points)

#### 📋 Description

Users should have the capability to update their password 🔑 within the application independently. This feature increases user autonomy and ensures they can maintain their account security up-to-date.

#### 🔨 Implementation Details

1. **Separate Change Password Option:** Provide a distinct option for users to change their password independently from other personal information.
2. **Form Validation:** Ensure the updated password meets the necessary criteria (minimum length, complexity, etc.).
3. **Current Password Verification:** Confirm the user's current password before applying the change.
4. **Saving Changes:** Provide a mechanism to save changes made in the password change mode, ideally with a clear indication (such as a button) that signifies saving changes.
5. **Backend Integration:** Implement the password change by integrating with the commercetools platform, following the appropriate API guidelines.
6. **Re-authentication:** Trigger re-authentication if needed, according to the authentication/authentication flow requirements for commercetools applications.

#### 🎨 Visual Implementation Ideas

1. **Change Password Button/Link:** Add a visible "Change Password" 🔑 button or link within the user profile page or settings, indicating that the password can be changed independently.
2. **Password Change Modal or Page:** Display a modal or navigate to a separate page when the "Change Password" option is selected, showing required input fields (current password, new password, confirm new password).
3. **Save and Cancel Buttons:** Display "Save" and "Cancel" buttons on the password change screen, making it clear how users can save or discard changes.

#### ✅ Acceptance Criteria

- Users can change their password separately from their other personal information on the User Profile page.
- The system appropriately validates the new password based on the necessary criteria.
- The user can save the changes, and is given a clear indication of the success or failure of this operation.

#### 🔗 Useful Links and Resources

1. [commercetools: Change password of Customer](https://docs.commercetools.com/api/projects/customers#change-password-of-customer)
2. [Form Validation with JavaScript](https://www.w3schools.com/js/js_validation.asp)

### 🎯 Issue RSS-ECOMM-3_18: Manage Addresses 🏡 in User Profile Page with commercetools API (15 points)

#### 📋 Description

Users should have the capability to manage their addresses within the application. This feature increases user autonomy and ensures they can maintain their address details up-to-date using the commercetools API. Users should also be able to set default billing and shipping addresses.

#### 🔨 Implementation Details

1. **Address Management Option:** Provide a distinct option for users to access address management within their user profile.
2. **Adding New Addresses:** Allow users to add new addresses by entering all required address details (e.g., name, street, city, postcode, country).
3. **Deleting Existing Addresses:** Enable users to remove existing addresses.
4. **Updating Address Details:** Permit users to update existing address details with valid information.
5. **Set Default Billing and Shipping Addresses:** Allow users to choose their default billing and shipping addresses from the list of existing addresses.
6. **Form Validation:** Ensure the provided address details meet the necessary criteria (non-empty fields, valid format).
7. **Backend Integration:** Implement address management by integrating with the commercetools API for customers and addresses, following the appropriate API guidelines.

#### 🎨 Visual Implementation Ideas

1. **Addresses List:** Display a list or card view of the user's existing addresses, with information organized neatly and clearly.
2. **Add Address Button:** Add a visible "Add Address" button above or below the addresses list, making it easy to create a new address.
3. **Edit and Delete Icons:** Place edit 📝 and delete ❌ icons next to each address, allowing users to quickly update or remove addresses as needed.
4. **Default Billing and Shipping Selection:** Include checkboxes or radio buttons next to each address, allowing users to select default billing and shipping addresses.
5. **Address Entry Modal:** Use a modal or dropdown to show address entry fields, ensuring a clean interface that saves space.

#### ✅ Acceptance Criteria

- Users can manage their addresses within the User Profile page using commercetools API, including adding new addresses, deleting existing ones, and updating address details.
- Users can set their default billing and shipping addresses.
- The system validates input address details according to the necessary criteria.
- The application properly integrates with the commercetools API for address management purposes.

#### 🔗 Useful Links and Resources

1. [commercetools: Update customer](https://docs.commercetools.com/api/projects/customers#update-actions)

### 🎯 Issue RSS-ECOMM-3_19: Implement Routing 🚦 and Browser Navigation 🌐 for Catalog and Product Detail Pages (25 points)

#### 📋 Description

Implement routing to allow seamless navigation between the Catalog page and the Product Detail page, directly accessing specific product detail pages via unique URLs, and supporting browser navigation buttons (forward and back). The pages should be accessible whether the user is logged in or not.

#### 🔨 Implementation Details

1. **Catalog Page:** This page should display a list of products. Each product card should contain a link (or be a link itself) directing to the corresponding product's detail page.
2. **Product Detail Page:** This page should display detailed information about a single product. It should be accessible by clicking on a product card from the Catalog page or by directly accessing a unique URL for the product.
3. **Routing:** The URL in the browser should change when users navigate from the Catalog page to a Product Detail page and vice versa. Each product should have a unique URL that can be directly accessed to view its details.
4. **Browser Navigation Buttons:** Implement support for browser navigation buttons. If a user navigates to a different product detail page or the Catalog page, the back button should take the user to the previously viewed page. The forward button should work correspondingly after using the back button.
5. **Public Accessibility:** The Catalog and Product Detail pages should be accessible whether the user is logged in or not. These pages should not require authentication.

#### ✅ Acceptance Criteria

- Clicking on a product card from the Catalog page takes the user to the corresponding Product Detail page.
- Navigating from the Catalog page to a Product Detail page and vice versa changes the URL in the browser.
- Each product has a unique URL that can be directly accessed to view its details.
- Directly accessing a product's unique URL leads to the corresponding Product Detail page.
- The browser's back and forward buttons work as expected, enabling the user to navigate through their history of visited pages.
- The Catalog and Product Detail pages are accessible regardless of the user's authentication state.

#### 🔗 Useful Links and Resources

1. [Using the HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
2. [Introduction to routing in React](https://reactrouter.com/en/6.14.1/start/tutorial)
3. [Client-side Routing in Angular](https://angular.io/guide/router)
4. [Vue Router](https://router.vuejs.org/)

### 🎯 Issue RSS-ECOMM-3_20: Implement Routing 🚦 and Browser Navigation 🌐 for User Profile Page (15 points)

#### 📋 Description

To enhance the user experience, implement routing and browser navigation that allows users to navigate to the User Profile page. The User Profile page should be restricted only to logged-in users.

#### 🔨 Implementation Details

1. **User Profile Page:** This page should display information about a user's profile. Only logged-in users should have access to this page.
2. **Routing:** The URL in the browser should change when users navigate to the User Profile page and when they navigate away from it. The User Profile page should have a unique URL that can be directly accessed.
3. **Browser Navigation:** Ensure the proper functioning of the browser's navigation buttons (Back and Forward) when navigating to and from the User Profile page.
4. **Access Control:** The User Profile page should be accessible only to logged-in users. If a user who is not logged in tries to access the User Profile page, they should be redirected to the Login page.

#### ✅ Acceptance Criteria

- Navigating to and from the User Profile page changes the URL in the browser.
- The User Profile page has a unique URL that can be directly accessed.
- Directly accessing the unique URL for the User Profile page leads to the User Profile page, if the user is logged in. If the user is not logged in, they are redirected to the Login page.
- The browser's Back and Forward buttons work correctly when navigating to and from the User Profile page.
- Only logged-in users can access the User Profile page.

### 🎯 Issue RSS-ECOMM-3_21: Implement Navigation 🚦 to Catalog Page in Header (5 points)

#### 📋 Description

As a fundamental feature, all users, regardless of their status (logged in or not), should have the ability to navigate to the Catalog page using the navigation options provided in the header of the website.

#### 🔨 Implementation Details

1. **Navigation Option:** Add a navigation option to the header that directs users to the Catalog page. This could be a text link, an icon, or a combination of both.
2. **Responsive Design:** Ensure that the navigation option is visible and accessible on different devices and screen sizes.

#### 🎨 Visual Implementation Ideas

1. **Visual Cues:** The navigation option should have some visual indication (like underlining or color change) when hovered or clicked to provide feedback to the user.
2. **Iconography:** If using an icon, choose or design one that clearly signifies the Catalog page.

#### ✅ Acceptance Criteria

- A navigation option to the Catalog page is present in the website's header.
- Clicking on the navigation option redirects the user to the Catalog page.

### 🎯 Issue RSS-ECOMM-3_22: Implement User Profile Navigation 🚦 in Header (5 points)

#### 📋 Description

In order to provide users with easy access to their Profile page, a User Profile link or button should be added to the header of the site. This navigation option should be visible only to logged-in users.

#### 🔨 Implementation Details

1. **Navigation Option:** Add a User Profile link or button to the header that directs logged-in users to their Profile page. This could be a text link, an icon, or a combination of both. This option should be hidden from users who are not logged in.
2. **Responsive Design:** Ensure that the User Profile link or button is visible and accessible on different devices and screen sizes.

#### 🎨 Visual Implementation Ideas

1. **Visual Cues:** The User Profile link or button should have some visual indication (like underlining or color change) when hovered or clicked to provide feedback to the user.
2. **Iconography:** If using an icon, choose or design one that clearly signifies the User Profile page.

#### ✅ Acceptance Criteria

- A User Profile link or button is present in the website's header only for logged-in users.
- Clicking on the User Profile link or button redirects the user to their Profile page.
- Users who are not logged in do not see the User Profile link or button.

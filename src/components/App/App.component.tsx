import React, { useEffect, useState } from 'react';
import { Products, Product } from '../Products/Products.component.tsx';
import { Cart } from '../Cart/Cart.component.tsx';
import { Layout, Button, Badge, Drawer, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

export const App: React.FC = () => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const [cartItems, setCartItems] = useState(storedItems);
    const [isCartVisible, setCartVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existingProduct = prevItems.find(item => item.id === product.id);
            if (existingProduct) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const toggleCartVisibility = () => {
        setCartVisible(!isCartVisible);
    };

    const getTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    return (
        <Layout>
            <Header style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Product List</h1>
                <Button 
                    onClick={toggleCartVisibility} 
                    style={{ marginLeft: '20px', color: 'white', backgroundColor: '#1890ff' }}
                    type="primary"
                >
                    <Badge count={getTotalQuantity()} offset={[10, 0]}>
                        <ShoppingCartOutlined style={{ color: 'white' }} />
                    </Badge>
                </Button>
            </Header>
            <Content style={{ padding: '20px' }}>
                <Products onAddToCart={handleAddToCart} />
            </Content>

            <Drawer
                title="Shopping Cart"
                placement="right"
                onClose={toggleCartVisibility}
                visible={isCartVisible}
                width={400}
            >
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <Cart items={cartItems} setCartItems={setCartItems} />
                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <Title level={4}>Total: ${getTotalPrice()}</Title>
                            <Button type="primary" danger onClick={handleClearCart}>
                                Clear Cart
                            </Button>
                        </div>
                    </>
                )}
            </Drawer>
        </Layout>
    );
};

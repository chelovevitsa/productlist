import React from 'react';
import { Card, List, Button } from 'antd';
import { Product } from '../Products/Products.component';

interface CartProps {
    items: Product[];
    setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const Cart: React.FC<CartProps> = ({ items, setCartItems }) => {
    const handleIncreaseQuantity = (product: Product) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecreaseQuantity = (product: Product) => {
        setCartItems(prevItems => {
            const existingProduct = prevItems.find(item => item.id === product.id);
            if (existingProduct && existingProduct.quantity > 1) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevItems.filter(item => item.id !== product.id);
            }
        });
    };

    const handleDeleteProduct = (product: Product) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== product.id));
    };

    return (
        <Card>
            <List
                bordered
                dataSource={items}
                renderItem={item => (
                    <List.Item>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0 }}>{item.name}</h4>
                                    <p style={{ margin: 0 }}>${item.price} x {item.quantity}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button onClick={() => handleIncreaseQuantity(item)} style={{ marginRight: '5px' }}>+</Button>
                                <Button onClick={() => handleDecreaseQuantity(item)} disabled={item.quantity <= 1}>-</Button>
                                <Button onClick={() => handleDeleteProduct(item)} type="link" danger style={{ marginLeft: '10px' }}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    );
};

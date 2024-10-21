import React, { useState } from 'react';
import { Card, Col, Row, Button, Input } from 'antd';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface ProductsProps {
    onAddToCart: (product: Product) => void;
}

const products: Product[] = [
    { 
        id: 1, 
        name: "Product 1", 
        price: 50, 
        image: "https://img.freepik.com/free-photo/back-view-man-carrying-tote-bag_53876-96623.jpg?semt=ais_hybrid",
        quantity: 0
    },
    { 
        id: 2, 
        name: "Product 2", 
        price: 100, 
        image: "https://img.freepik.com/premium-photo/minimal-blank-tote-bag-mockup-design_1008415-49176.jpg?semt=ais_hybrid",
        quantity: 0
    },
    { 
        id: 3, 
        name: "Product 3", 
        price: 150, 
        image: "https://img.freepik.com/premium-photo/tote-bag-mockup_1258715-86352.jpg?semt=ais_hybrid",
        quantity: 0
    }
];

export const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
    const [search, setSearch] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <Input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
            <Row gutter={16}>
                {filteredProducts.map(product => (
                    <Col span={8} key={product.id}>
                        <Card
                            hoverable
                            cover={<img alt={product.name} src={product.image} />}
                        >
                            <Card.Meta title={product.name} description={`$${product.price}`} />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={() => onAddToCart(product)} style={{ marginTop: '5px', width: '100%', fontSize: '0.6rem' }} size="small">
                                    Add to cart
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

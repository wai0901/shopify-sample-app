import React, { useState } from 'react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ProductList from '../components/ProductList';
import axios from 'axios';

function Index() {

    const [ modal, setModal ] = useState({open: false});
    const emptyState = !store.get('ids');

    function handleSelection(resources) {
        const idsFromResources = resources.selection.map(product => product.id);
        setModal({ open: false });
        store.set('ids', idsFromResources);
        console.log('this is product id', store.get('ids'));

        const selectedProducts = resources.selection;

        deleteApiData();

        //send the products
        selectedProducts.map(product => makeApiCall(product));
    }

    //delete function
    function deleteApiData() {
        const url = '/api/products';
        
        axios.delete(url);
    }

    //API post call function
    async function makeApiCall(products) {
        const url = '/api/products';

        axios.post(url, products)
            .then(result => console.log(result))
            .catch(error => console.log(error))
    }

    return (
        <Page>
            <TitleBar 
                primaryAction={{
                    content: 'Select New Product',
                    onAction: () => setModal({ open: true })
                }}
            />
            <ResourcePicker
                resourceType="Product"
                showVariants={false}
                open={modal.open}
                onSelection={(resources) => handleSelection(resources)}
                onCancel={() => setModal({ open: false })}
            />
            {
                emptyState ? 
                <Layout>
                    <EmptyState
                        heading="Manage your inventory transfers"
                        action={{
                            content: 'Select Products',
                            onAction: () => setModal({ open: true }),
                            }}
                        image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                    >
                        <p>Select Product</p>
                    </EmptyState> 
                </Layout>:
                <ProductList />
            }
        </Page>
    )
}

export default Index;
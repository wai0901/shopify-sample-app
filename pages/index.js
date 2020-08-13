import React, { useState } from 'react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import store from 'store-js';
import ProductList from '../components/ProductList';

function Index() {

    const [ modal, setModal ] = useState({open: false});
    const emptyState = !store.get('ids');

    function handleSelection(resources) {
        const idsFromResources = resources.selection.map(product => product.id);
        setModal({ open: false });
        store.set('ids', idsFromResources);
        console.log('this is product id', store.get('ids'));
    }

    return (
        <Page>
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
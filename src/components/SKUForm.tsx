import { TextInput, NumberInput, Button, Stack, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

interface SKUFormValues {
  sku: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

export function SKUForm() {
  const form = useForm<SKUFormValues>({
    initialValues: {
      sku: '',
      name: '',
      price: 0,
      category: '',
      quantity: 0,
    },
    validate: {
      sku: (value) => (value ? null : 'SKU is required'),
      name: (value) => (value ? null : 'Name is required'),
      price: (value) => (value >= 0 ? null : 'Price must be positive'),
      category: (value) => (value ? null : 'Category is required'),
      quantity: (value) => (value >= 0 ? null : 'Quantity must be positive'),
    },
  });

  const handleSubmit = (values: SKUFormValues) => {
    console.log(values);
    // Handle form submission
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="SKU"
          placeholder="Enter SKU"
          required
          {...form.getInputProps('sku')}
        />
        <TextInput
          label="Name"
          placeholder="Enter product name"
          required
          {...form.getInputProps('name')}
        />
        <NumberInput
          label="Price"
          placeholder="Enter price"
          required
          min={0}
          {...form.getInputProps('price')}
        />
        <Select
          label="Category"
          placeholder="Select category"
          required
          data={['Electronics', 'Clothing', 'Books', 'Food', 'Other']}
          {...form.getInputProps('category')}
        />
        <NumberInput
          label="Quantity"
          placeholder="Enter quantity"
          required
          min={0}
          {...form.getInputProps('quantity')}
        />
        <Button type="submit">Add SKU</Button>
      </Stack>
    </form>
  );
}
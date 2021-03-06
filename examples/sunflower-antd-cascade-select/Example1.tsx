import React from 'react';
import { Select, Form } from 'antd';
import { useCascadeSelect, useFormTable } from 'sunflower-antd';

const Option = Select.Option;


export default Form.create()(props => {
  const { form } = props;
  const { selects, search } = useCascadeSelect({
    form,
    list: [
      {
        name: 'select0',
        async options() {
          await new Promise(r => setTimeout(r, 1000));
          return [{
            label: 'LILY',
            value: 'lily',
          }, {
            label: 'JACK',
            value: 'jack',
          }];
        }
      },
      {
        name: 'select1',
        async options(value) {
          await new Promise(r => setTimeout(r, 1000));
          return [{
            label: `${value.toUpperCase()} 1`,
            value: `${value} 1`,
          },
          {
            label: `${value.toUpperCase()} 2`,
            value: `${value} 2`,
          }];
        },
      }
    ],
  });
  const [select0, select1] = selects;

  const { formProps } = useFormTable({
    form,
  });


  return <div>

    <Form {...formProps}>
      <Form.Item
        label="Select0"
      >
        {
          form.getFieldDecorator('select0')(
            <Select allowClear {...select0.props}>
              {
                select0.options.map(item => <Option key={item.key} value={item.value} >
                  {item.label}
                </Option>)
              }
            </Select>
          )
        } 
      </Form.Item>

      <Form.Item
        label="Select1"
      >
       {
          form.getFieldDecorator('select1')(
            <Select allowClear {...select1.props}>
              {
                select1.options.map(item => <Option key={item.key} value={item.value} >
                  {item.label}
                </Option>)
              }
            </Select>
          )
        } 
      </Form.Item>
    </Form>

  </div>;
});

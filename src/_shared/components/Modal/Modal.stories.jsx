import React from 'react';

import Modal from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal
};

const Template = (args) => <Modal {...args} />;

export const DefaultModal = Template.bind({});

export const StandardModal = Template.bind({});
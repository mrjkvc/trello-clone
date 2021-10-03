import React from 'react';

import Avatar from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Image
};

const Template = (args) => <Avatar {...args} />;

export const DefaultAvatar = Template.bind({});

export const StandardAvatar = Template.bind({});

StandardAvatar.args = {
  url: "https://images.telegram.hr/iXtXCqBxsYMWyCsRY2Sp3c4aQNGJQ4aKxQVIl8tajeE/preset:single1/aHR0cHM6Ly93d3cudGVsZWdyYW0uaHIvd3AtY29udGVudC91cGxvYWRzLzIwMTkvMDMvMzU2NTgyMTI4MjNfMzgwN2FhODIyNV9rLmpwZw.jpg",
  alt: "Slika",
  //style: "{height:200rem; width:20rem}"
};
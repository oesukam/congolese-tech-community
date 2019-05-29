const mapWithUserId = (data, user) => {
  return data.map(v => {
    v.user = user;
    return v;
  });
};

export default mapWithUserId;

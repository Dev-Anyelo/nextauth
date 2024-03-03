
export const loadUsers = async (query: string) => {
  try {
    const response = await fetch(`/api/users?query=${query}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

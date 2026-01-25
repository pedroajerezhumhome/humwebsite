'use server'

export async function submitToMaropost(formData: {
  email: string;
  city: string;
}) {
  const { email, city } = formData;

  try {
    const response = await fetch(
      `https://api.maropost.com/accounts/${process.env.MAROPOST_ACCOUNT_ID}/contacts.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `ApiKey ${process.env.MAROPOST_API_KEY}`,
        },
        body: JSON.stringify({
          contact: {
            email: email,
            custom_field: {
              city: city,
            },
          },
          subscribe: true,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Maropost API error:', errorText);
      return { success: false, error: 'Failed to subscribe' };
    }

    return { success: true };
  } catch (error) {
    console.error('Maropost submission error:', error);
    return { success: false, error: 'Network error' };
  }
}

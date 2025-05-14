export const useStrapi = () => {
  const { $config } = useNuxtApp()
  const baseURL = $config.public.strapiBaseURL

  /**
   * Fetch data from Strapi
   * @param endpoint e.g. 'blog-posts?populate=*'
   */
  const fetchFromStrapi = async (endpoint: string) => {
    try {
      const response = await fetch(`${baseURL}/${endpoint}`)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Strapi fetch error:', error)
      return null
    }
  }

  return { fetchFromStrapi }
}

from rest_framework.pagination import PageNumberPagination

class MoviePagination(PageNumberPagination):
    page_size = 10  # Number of movies per page
    page_size_query_param = 'page_size'  # Allow clients to specify page size
    max_page_size = 100  # Max limit of items per page

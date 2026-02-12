from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'phone')
    search_fields = ('email',)

    class Meta:
        verbose_name = "Kontakt"
        verbose_name_plural = "Kontakte"

    def __str__(self):
        return self.email
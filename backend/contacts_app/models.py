from django.db import models

class Contact(models.Model):
    """Contact model.
    Represents a contact entry in the system.  
    """
    firstname = models.CharField(max_length=100, default='')
    lastname = models.CharField(max_length=100, blank=True, default='')
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.firstname} {self.lastname}".strip()